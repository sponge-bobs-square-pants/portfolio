import datetime
import uuid
import threading
import time
import warnings
from typing import List, Dict, Any
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_together import ChatTogether
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage
from langchain_core.runnables import RunnableConfig
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.prebuilt import create_react_agent
from langgraph_swarm import create_handoff_tool, create_swarm
from dotenv import load_dotenv

# Suppress datetime deprecation warnings from external libraries
warnings.filterwarnings("ignore", category=DeprecationWarning, message=".*datetime.*utcnow.*")

load_dotenv()

class PortfolioAssistant:
    def __init__(self, together_api_key: str, model_name: str = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"):
        """
        Initialize the Portfolio Assistant.
        
        Args:
            together_api_key: Together API key
            model_name: The model to use for AI agents
        """
        self.cleanup_threshold_hours = 1  # 1 HR TIMER FOR CLEANING UP INACTIVE THREADS
        self.last_activity = datetime.datetime.now(datetime.UTC)
        self._cleanup_timer = None
        self._is_destroyed = False
        self.user_thread_ids = set()
        self._lock = threading.Lock()
        
        print(f"🚀 Auto-cleanup enabled: {self.cleanup_threshold_hours*3600} seconds")
        
        self.model = ChatTogether(
            together_api_key=together_api_key,
            model=model_name
        )
        
        # Create the assistant
        self.assistant = self._create_portfolio_assistant()
        
        # Set up checkpointer and build swarm
        self.checkpointer = InMemorySaver()
        
        # Build the swarm
        self.builder = create_swarm(
            [self.assistant],
            default_active_agent="Parth"
        )
        
        self.app = self.builder.compile(checkpointer=self.checkpointer)
        
        # Initialize thread_id that will be used consistently
        self.thread_id = str(uuid.uuid4())
        self.config = {"configurable": {"thread_id": self.thread_id}}
        
        self._start_cleanup_timer()
    
    def _update_activity(self):
        """Update the last activity timestamp."""
        with self._lock:
            if not self._is_destroyed:
                self.last_activity = datetime.datetime.now(datetime.UTC)
    
    def _start_cleanup_timer(self):
        """Start the cleanup timer that checks for inactivity."""
        def cleanup_check():
            while not self._is_destroyed:
                time.sleep(30)  # Check every 30 seconds
                
                with self._lock:
                    if self._is_destroyed:
                        break
                    
                    current_time = datetime.datetime.now(datetime.UTC)
                    inactive_duration = current_time - self.last_activity
                    
                    if inactive_duration.total_seconds() > (self.cleanup_threshold_hours * 3600):
                        if hasattr(self, 'user_thread_ids') and len(self.user_thread_ids) > 0:
                            print(f"⏰ Cleaning up threads (inactive for {inactive_duration})")
                            self._cleanup_threads()
                        
                        # Reset activity timer and continue running
                        self.last_activity = datetime.datetime.now(datetime.UTC)
        
        self._cleanup_timer = threading.Thread(target=cleanup_check, daemon=True)
        self._cleanup_timer.start()
    
    def _cleanup_threads(self):
        """Clean up thread states."""
        print("🧹 Cleaning up threads")
        
        try:
            if hasattr(self, 'user_thread_ids'):
                self.user_thread_ids.clear()
            
            # Clear checkpointer memory
            if hasattr(self, 'checkpointer') and hasattr(self.checkpointer, 'storage'):
                self.checkpointer.storage.clear()
            
            print("✅ Thread cleanup completed")
            
        except Exception as e:
            print(f"❌ Error cleaning up threads: {e}")

    def _make_prompt(self):
        """Create the prompt function for the assistant."""
        def prompt(state: dict, config: RunnableConfig) -> list:
            thread_id = config["configurable"].get("thread_id")
            
            system_prompt = f"""You are a helpful assistant called Trinity designed to only answer questions about Parth's portfolio.
            You will introduce yourself first and then ask the user to ask any question about Parth's portfolio.
            You will only answer questions related to Parth's portfolio and nothing else.
            
            # INFORMATION ABOUT PARTH'S PORTFOLIO:
            - Parth currently works as Md.Software Developer at gradscaler.
            - Parth has expertise in Python, Langchain, Langgraph, MERN Stack, AWS, Docker and more.
            - Parth's contact information is:
                - Email: parthchawla65@gmail.com
                - LinkedIn: https://www.linkedin.com/in/parth-chawla
                - GitHub: https://github.com/sponge-bobs-square-pants
                - Instagram: https://www.instagram.com/partee_party
            - Parth has worked in Wildberries, Alendei Platforms, and has been a part of various projects.
            - Parth has done his masters in Information Security and Web Technologies from the ITMO University, Russia.
            - Parth has worked on various projects, including:
                
                ## At GRADSCALER (September 2024 - Present):
                - Data Annotation Tool: Built with real-time data addition using Chokidar, auto MongoDB object creation, and CSV export, improving labeling efficiency.
                - Parenting Plan Platform: Developed with AI-powered chat, dynamic invites, and structured co-parenting tools for better communication.
                - Legal Resource Platform: Designed featuring a blog section and an AI-powered chat interface, enhancing engagement for aspiring lawyers.
                - AI-Powered Shopping Assistant: Built for product discovery, purchase recommendations, and site-wide chat-based navigation.
                
                ## At ALENDEI PLATFORMS (Jan 2024 - September 2024):
                - eKYC Verification Server: Developed with PAN, Aadhar, and Bank Verification, creating an admin dashboard, reducing verification time by 40% and improving accuracy.
                - AI-Powered Chatbot: Built trainable across websites for enhanced user support, increasing customer engagement by 35% and reducing support response times.
                - WhatsApp and Zoho API Integration: Integrated APIs to automate service ticket creation, manage estimates, invoices, and update payments in Zoho.
                - Government Database System: Created for managing user addresses and problem reports, improving service delivery for 500,000+ citizens in Karnataka and streamlining public service access.
                - Advanced Search Filtering System: Created with intelligent keyword matching and semantic normalization for government schemes, enhancing search accuracy by 60%.
            
            Thread ID: {thread_id}
            Today is: {datetime.datetime.now(datetime.UTC)}
            
            Be friendly, professional, and helpful. If someone asks about topics unrelated to Parth's portfolio, politely redirect them back to asking about Parth's work and experience.
            While answering about projects, name the projects and ask the user to specify which project they want to know more about.
            Keep the replies under 50 words.
            """
            
            return [{"role": "system", "content": system_prompt}] + state["messages"]

        return prompt
    
    def _create_portfolio_assistant(self):
        """Create the portfolio assistant agent."""
        return create_react_agent(
            self.model,
            [],  # No tools needed for basic portfolio Q&A
            prompt=self._make_prompt(),
            name="Parth",
        )

    def process_message(self, message: str, thread_id: str = None):
        """
        Process a user message and return the AI response.
        
        Args:
            message: User's input message
            thread_id: Optional thread ID for conversation tracking
            
        Returns:
            AI assistant's response
        """
        self._update_activity()
        
        # Use provided thread_id or the default one
        thread_id = thread_id or self.thread_id
        self.user_thread_ids.add(thread_id)
        config = {"configurable": {"thread_id": thread_id}}
        
        print(f"USER QUERY: {message}")
        
        # Create a HumanMessage
        user_message = HumanMessage(content=message)
        
        # Process with the AI swarm
        stream = self.app.stream(
            {"messages": [user_message]},
            config,
            subgraphs=True,
        )
        
        # Extract AI responses
        ai_responses = []
        current_agent = "Parth"
        
        for ns, update in stream:
            for node, node_updates in update.items():
                if node_updates is None:
                    continue
                
                if isinstance(node_updates, (dict, tuple)):
                    node_updates_list = [node_updates]
                elif isinstance(node_updates, list):
                    node_updates_list = node_updates
                else:
                    continue
                    
                for node_update in node_updates_list:
                    messages_key = next(
                        (k for k in node_update.keys() if "messages" in k), None
                    )
                    if messages_key is not None and len(node_update[messages_key]) > 0:
                        # Get the last message
                        last_message = node_update[messages_key][-1]
                        
                        # Process AI messages
                        if last_message.type == "ai":
                            ai_content = last_message.content
                            ai_responses.append(ai_content)
                            print(f"AI RESPONSE ({current_agent}): {ai_content[:100]}...")
        
        # Return the last AI response or a default message
        final_response = ai_responses[-1] if ai_responses else "I'm sorry, I couldn't process your request."
        print(f"FINAL RESPONSE FROM: {current_agent}")
        print("=" * 50)
        
        return final_response
    
    def destroy(self):
        """Clean up resources."""
        self._is_destroyed = True
        self._cleanup_threads()


class PortfolioAPI:
    """Flask API wrapper for the Portfolio Assistant."""
    
    def __init__(self, together_api_key: str):
        self.app = Flask(__name__)
        
        # Configure CORS to allow requests from localhost:5173
        CORS(self.app, origins=['http://localhost:5173'], 
             methods=['GET', 'POST', 'OPTIONS'],
             allow_headers=['Content-Type', 'Authorization'])
        
        self.assistant = PortfolioAssistant(together_api_key)
        self.setup_routes()
    
    def setup_routes(self):
        """Set up API routes."""
        
        @self.app.route('/health', methods=['GET'])
        def health_check():
            return jsonify({"status": "healthy", "timestamp": datetime.datetime.now(datetime.UTC).isoformat()})
        
        @self.app.route('/chat', methods=['POST'])
        def chat():
            try:
                data = request.get_json()
                
                if not data or 'message' not in data:
                    return jsonify({"error": "Message is required"}), 400
                
                message = data['message']
                thread_id = data.get('thread_id')
                
                response = self.assistant.process_message(message, thread_id)
                
                return jsonify({
                    "message": response,
                    "thread_id": thread_id or self.assistant.thread_id,
                    "timestamp": datetime.datetime.now(datetime.UTC).isoformat()
                })
                
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        
        @self.app.route('/new_conversation', methods=['POST'])
        def new_conversation():
            """Start a new conversation with a fresh thread."""
            try:
                new_thread_id = str(uuid.uuid4())
                greeting_response = self.assistant.process_message(
                    "Hello! Please introduce yourself and tell me what I can ask you about.", 
                    new_thread_id
                )
                
                return jsonify({
                    "thread_id": new_thread_id,
                    "message": greeting_response,
                    "timestamp": datetime.datetime.now(datetime.UTC).isoformat()
                })
                
            except Exception as e:
                return jsonify({"error": str(e)}), 500
    
    def run(self, host='localhost', port=5002, debug=True):
        """Run the Flask API server."""
        print(f"Starting Portfolio Assistant API on http://{host}:{port}")
        print("Available endpoints:")
        print(f"  GET  http://{host}:{port}/health - Health check")
        print(f"  POST http://{host}:{port}/chat - Send a message")
        print(f"  POST http://{host}:{port}/new_conversation - Start new conversation")
        print("CORS enabled for http://localhost:5173")
        self.app.run(host=host, port=port, debug=debug)


def main():
    """Main function to run the API server."""
    import os
    
    # Get Together API key from environment variable
    together_api_key = os.getenv('TOGETHER_API_KEY')
    
    if not together_api_key:
        print("Error: Please set the TOGETHER_API_KEY environment variable")
        print("You can set it by running: export TOGETHER_API_KEY='your-api-key-here'")
        return
    
    # Always run API server
    try:
        api = PortfolioAPI(together_api_key)
        api.run()
    except KeyboardInterrupt:
        print("\nShutting down API server...")


if __name__ == "__main__":
    main()