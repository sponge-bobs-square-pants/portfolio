from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import uuid
import threading
import time
import warnings
import os
import traceback
from typing import List, Dict, Any, Optional
from langchain_together import ChatTogether
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage, SystemMessage
from langchain_core.runnables import RunnableConfig
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END
from langgraph.graph import MessagesState
from langgraph.checkpoint.memory import MemorySaver
from pydantic import BaseModel, Field
import json

# Load environment variables
load_dotenv()

# Pydantic Models for Structured Output
class SocialLink(BaseModel):
    """Individual social media link"""
    name: str = Field(description="Name of the social platform (e.g., 'LinkedIn', 'Email', 'GitHub')")
    url: str = Field(description="Full URL to the social profile or contact")
    handle: str = Field(description="Username, handle, or display text for the link")
    icon: str = Field(description="Icon name for the platform (e.g., 'linkedin', 'mail', 'github', 'instagram')")

class Project(BaseModel):
    """Individual project information"""
    name: str = Field(description="Name of the project")
    company: str = Field(description="Company where the project was done")
    description: str = Field(description="Brief description of the project")
    technologies: List[str] = Field(description="List of technologies used in the project")
    impact: Optional[str] = Field(description="Impact or results of the project", default=None)

class AssistantOutput(BaseModel):
    """Structured output for Trinity assistant responses"""
    message: str = Field(description="The main text message response")
    type: str = Field(description="Type of response: 'text', 'social', 'projects', 'contact', 'welcome'")
    social_links: Optional[List[SocialLink]] = Field(description="List of social media links when type is 'social' or 'contact'", default=None)
    projects: Optional[List[Project]] = Field(description="List of projects when type is 'projects'", default=None)
    suggested_questions: Optional[List[str]] = Field(description="Suggested follow-up questions for the user", default=None)

class TrinityChat:
    def __init__(self):
        """Initialize the Trinity Chat system"""
        self.together_api_key = os.getenv("TOGETHER_API_KEY")
        self.model_name = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"
        self.model = ChatTogether(
            together_api_key=self.together_api_key,
            model=self.model_name
        )
        self.checkpointer = MemorySaver()
        self.system_prompt = self._get_system_prompt()
        self.agent_graph = self._build_graph()
    
    def _get_system_prompt(self):
        """Get the system prompt for the assistant"""
        return """You are Trinity, a helpful assistant designed to answer questions about Parth's portfolio and provide structured responses.

# RESPONSE TYPES:
- 'welcome': For initial greetings and introductions
- 'text': For general information and conversations
- 'social': When user asks for contact information or social links
- 'projects': When user asks about specific projects or work experience
- 'contact': When user wants to get in touch

# INFORMATION ABOUT PARTH:
- Current Role: Md.Software Developer at Gradscaler (September 2024 - Present)
- Education: Masters in Information Security and Web Technologies from ITMO University, Russia
- Expertise: Python, Langchain, Langgraph, MERN Stack, AWS, Docker, AI/ML

## CONTACT INFORMATION:
- Email: parthchawla65@gmail.com
- LinkedIn: https://www.linkedin.com/in/parth-chawla
- GitHub: https://github.com/sponge-bobs-square-pants
- Instagram: https://www.instagram.com/partee_party

## PROJECTS AT GRADSCALER:
1. Data Annotation Tool: Real-time data addition with Chokidar, auto MongoDB object creation, CSV export
2. Parenting Plan Platform: AI-powered chat, dynamic invites, structured co-parenting tools
3. Legal Resource Platform: Blog section with AI-powered chat interface for aspiring lawyers
4. AI-Powered Shopping Assistant: Product discovery, purchase recommendations, chat-based navigation

## PROJECTS AT ALENDEI PLATFORMS (Jan 2024 - Sep 2024):
1. eKYC Verification Server: PAN, Aadhar, Bank verification with admin dashboard (40% faster verification)
2. AI-Powered Chatbot: Trainable across websites (35% engagement increase)
3. WhatsApp & Zoho API Integration: Automated service tickets, estimates, invoices
4. Government Database System: User addresses and problem reports for 500,000+ citizens
5. Advanced Search Filtering: Intelligent keyword matching for government schemes (60% accuracy improvement)

# RESPONSE GUIDELINES:
- Always use structured output format
- When asked about contact/social: Return 'social' type with social_links
- When asked about projects: Return 'projects' type with relevant projects
- For general questions: Use 'text' type
- Keep messages concise but informative
- Always be helpful and professional
- Include suggested_questions when appropriate. The suggested_questions contain questions that user can ask you. Phrase them in a way that it the questions are from the user perspective.
- Only discuss Parth's portfolio - redirect other topics politely

# STRUCTURED OUTPUT REQUIREMENTS:
- message: Always provide a clear, helpful response
- type: Choose appropriate type based on user query
- social_links: Include when type is 'social' or 'contact'
- projects: Include when type is 'projects'  
- suggested_questions: Provide 2-3 relevant follow-up questions when helpful"""

    def assistant(self, state: MessagesState):
        """Assistant function for processing messages with structured output"""
        config = getattr(state, 'config', {})
        thread_id = config.get('configurable', {}).get('thread_id', 'unknown')
        
        system_prompt_with_context = f"""{self.system_prompt}

Thread ID: {thread_id}
Today is: {datetime.datetime.now(datetime.UTC)}

IMPORTANT: You must always respond with valid JSON that matches the AssistantOutput schema."""

        try:
            try:
                structured_llm = self.model.with_structured_output(AssistantOutput, include_raw=False)
                response = structured_llm.invoke([SystemMessage(content=system_prompt_with_context)] + state["messages"])
                
                if response is None:
                    raise ValueError("Structured output returned None")
                
                ai_message = AIMessage(content=response.model_dump_json())
                return {'messages': [ai_message]}
                
            except Exception as structured_error:
                print(f"Structured output failed: {str(structured_error)}")
                
                json_prompt = f"""{system_prompt_with_context}

Please respond with valid JSON in exactly this format:
{{
    "message": "your response here",
    "type": "text|social|projects|contact|welcome",
    "social_links": null or [{{ "name": "...", "url": "...", "handle": "...", "icon": "..." }}],
    "projects": null or [{{ "name": "...", "company": "...", "description": "...", "technologies": [...], "impact": "..." }}],
    "suggested_questions": null or ["question1", "question2"]
}}"""
                
                regular_response = self.model.invoke([SystemMessage(content=json_prompt)] + state["messages"])
                response_text = regular_response.content
                
                try:
                    response_json = json.loads(response_text)
                    validated_response = AssistantOutput(**response_json)
                    ai_message = AIMessage(content=validated_response.model_dump_json())
                    return {'messages': [ai_message]}
                except:
                    user_message = state["messages"][-1].content if state["messages"] else ""
                    
                    if any(word in user_message.lower() for word in ['contact', 'reach', 'email', 'social']):
                        fallback_response = AssistantOutput(
                            message="Here are Parth's contact details:",
                            type="social",
                            social_links=[
                                SocialLink(name="Email", url="mailto:parthchawla65@gmail.com", handle="parthchawla65@gmail.com", icon="mail"),
                                SocialLink(name="LinkedIn", url="https://www.linkedin.com/in/parth-chawla", handle="parth-chawla", icon="linkedin"),
                                SocialLink(name="GitHub", url="https://github.com/sponge-bobs-square-pants", handle="sponge-bobs-square-pants", icon="github"),
                                SocialLink(name="Instagram", url="https://www.instagram.com/partee_party", handle="@partee_party", icon="instagram")
                            ],
                            suggested_questions=["What projects has he worked on?", "What technologies does he use?"]
                        )
                    elif any(word in user_message.lower() for word in ['project', 'work', 'experience', 'company']):
                        fallback_response = AssistantOutput(
                            message="Parth has worked on several projects at Gradscaler and Alendei Platforms. Here are some key projects:",
                            type="projects",
                            projects=[
                                Project(
                                    name="Data Annotation Tool",
                                    company="Gradscaler",
                                    description="Built with real-time data addition using Chokidar, auto MongoDB object creation, and CSV export",
                                    technologies=["Node.js", "MongoDB", "Chokidar", "React"],
                                    impact="Improved labeling efficiency"
                                ),
                                Project(
                                    name="AI-Powered Chatbot",
                                    company="Alendei Platforms",
                                    description="Built trainable chatbot across websites for enhanced user support",
                                    technologies=["Python", "AI/ML", "Web APIs"],
                                    impact="35% engagement increase, reduced support response times"
                                )
                            ],
                            suggested_questions=["Tell me more about a specific project", "What technologies does he specialize in?"]
                        )
                    else:
                        fallback_response = AssistantOutput(
                            message="I'm Trinity, here to help you learn about Parth's portfolio. He's a software developer specializing in AI/ML, web development, and has worked on various innovative projects.",
                            type="text",
                            suggested_questions=["What projects has he worked on?", "How can I contact him?", "What are his technical skills?"]
                        )
                    
                    ai_message = AIMessage(content=fallback_response.model_dump_json())
                    return {'messages': [ai_message]}
        
        except Exception as e:
            print(f"Error in assistant function: {str(e)}")
            traceback.print_exc()
            fallback_response = AssistantOutput(
                message="I'm sorry, I encountered an error. Please try again.",
                type="text",
                suggested_questions=["What can you tell me about Parth?", "How can I contact him?"]
            )
            ai_message = AIMessage(content=fallback_response.model_dump_json())
            return {'messages': [ai_message]}

    def _build_graph(self):
        """Build the LangGraph workflow"""
        builder = StateGraph(MessagesState)
        
        builder.add_node("Assistant", self.assistant)
        builder.add_edge(START, "Assistant")
        builder.add_edge("Assistant", END)
        
        return builder.compile(checkpointer=self.checkpointer)

    def create_new_conversation(self):
        """Create a new conversation with a structured welcome message"""
        thread_id = str(uuid.uuid4())
        
        try:
            welcome_response = AssistantOutput(
                message="Hello! I'm Trinity, your assistant for learning about Parth's portfolio. I can help you discover his projects, skills, and contact information.",
                type="welcome",
                suggested_questions=[
                    "What projects has Parth worked on?",
                    "How can I contact Parth?",
                    "What technologies does Parth specialize in?"
                ]
            )
            
            return {
                "thread_id": thread_id,
                "response": welcome_response.model_dump(),
                "status": "success"
            }
        
        except Exception as e:
            print(f"Error in create_new_conversation: {str(e)}")
            traceback.print_exc()
            return {
                "thread_id": thread_id,
                "message": "Hello! I'm Trinity, your assistant for Parth's portfolio. How can I help you?",
                "status": "success"
            }

    def send_message(self, message: str, thread_id: str):
        """Send a message and get structured response"""
        if not message or not thread_id:
            return {
                "error": "Message and thread_id are required",
                "status": "error"
            }
        
        try:
            config = RunnableConfig(configurable={"thread_id": thread_id})
            
            user_message = HumanMessage(content=message)
            state = {"messages": [user_message]}
            
            print(f"Processing message: {message} for thread: {thread_id}")
            
            result = self.agent_graph.invoke(state, config)
            
            response_content = result["messages"][-1].content
            
            try:
                response_data = json.loads(response_content)
                structured_response = AssistantOutput(**response_data)
                
                return {
                    "response": structured_response.model_dump(),
                    "thread_id": thread_id,
                    "status": "success"
                }
            
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {str(e)}")
                print(f"Response content: {response_content}")
                return {
                    "response": {
                        "message": response_content,
                        "type": "text",
                        "social_links": None,
                        "projects": None,
                        "suggested_questions": None
                    },
                    "thread_id": thread_id,
                    "status": "success"
                }
            
            except Exception as e:
                print(f"Validation error: {str(e)}")
                return {
                    "response": {
                        "message": "I'm here to help you learn about Parth's portfolio. What would you like to know?",
                        "type": "text",
                        "social_links": None,
                        "projects": None,
                        "suggested_questions": ["Tell me about his projects", "How can I contact him?"]
                    },
                    "thread_id": thread_id,
                    "status": "success"
                }
            
        except Exception as e:
            print(f"Error in send_message: {str(e)}")
            traceback.print_exc()
            return {
                "error": f"Failed to process message: {str(e)}",
                "status": "error"
            }

    def get_conversation_history(self, thread_id: str):
        """Get conversation history for a thread"""
        try:
            config = RunnableConfig(configurable={"thread_id": thread_id})
            state = self.agent_graph.get_state(config)
            
            messages = []
            for msg in state.values.get("messages", []):
                if isinstance(msg, HumanMessage):
                    messages.append({
                        "role": "user", 
                        "content": msg.content,
                        "type": "text"
                    })
                elif isinstance(msg, AIMessage):
                    try:
                        structured_content = json.loads(msg.content)
                        messages.append({
                            "role": "assistant",
                            "response": structured_content
                        })
                    except:
                        messages.append({
                            "role": "assistant",
                            "response": {
                                "message": msg.content,
                                "type": "text"
                            }
                        })
            
            return {
                "messages": messages,
                "thread_id": thread_id,
                "status": "success"
            }
            
        except Exception as e:
            print(f"Error in get_conversation_history: {str(e)}")
            traceback.print_exc()
            return {
                "error": f"Failed to get conversation history: {str(e)}",
                "status": "error"
            }


# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Global Trinity Chat instance
trinity_chat = None

def get_trinity_chat():
    """Get or create Trinity Chat instance"""
    global trinity_chat
    if trinity_chat is None:
        try:
            trinity_chat = TrinityChat()
            print("Trinity Chat initialized successfully!")
        except Exception as e:
            print(f"Failed to initialize Trinity Chat: {str(e)}")
            traceback.print_exc()
            return None
    return trinity_chat

@app.route('/api/new_conversation', methods=['POST'])
def new_conversation():
    """Create a new conversation"""
    try:
        chat_instance = get_trinity_chat()
        if not chat_instance:
            return jsonify({
                "error": "Trinity Chat not initialized",
                "status": "error"
            }), 500
            
        result = chat_instance.create_new_conversation()
        return jsonify(result), 200
    except Exception as e:
        print(f"Error in new_conversation endpoint: {str(e)}")
        traceback.print_exc()
        return jsonify({
            "error": f"Failed to create new conversation: {str(e)}",
            "status": "error"
        }), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    """Send a message and get structured response"""
    try:
        chat_instance = get_trinity_chat()
        if not chat_instance:
            return jsonify({
                "error": "Trinity Chat not initialized",
                "status": "error"
            }), 500
            
        data = request.get_json()
        print(f"Received chat request: {data}")
        
        if not data:
            return jsonify({
                "error": "No data provided",
                "status": "error"
            }), 400
        
        message = data.get('message')
        thread_id = data.get('thread_id')
        
        if not message:
            return jsonify({
                "error": "Message is required",
                "status": "error"
            }), 400
            
        if not thread_id:
            return jsonify({
                "error": "Thread ID is required",
                "status": "error"
            }), 400
        
        result = chat_instance.send_message(message, thread_id)
        print(f"Chat result: {result}")
        
        if result.get("status") == "error":
            return jsonify(result), 500
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        traceback.print_exc()
        return jsonify({
            "error": f"Failed to process chat request: {str(e)}",
            "status": "error"
        }), 500

@app.route('/api/conversation_history/<thread_id>', methods=['GET'])
def get_conversation_history(thread_id):
    """Get conversation history"""
    try:
        chat_instance = get_trinity_chat()
        if not chat_instance:
            return jsonify({
                "error": "Trinity Chat not initialized",
                "status": "error"
            }), 500
            
        result = chat_instance.get_conversation_history(thread_id)
        
        if result.get("status") == "error":
            return jsonify(result), 500
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Error in conversation_history endpoint: {str(e)}")
        traceback.print_exc()
        return jsonify({
            "error": f"Failed to get conversation history: {str(e)}",
            "status": "error"
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    chat_instance = get_trinity_chat()
    return jsonify({
        "status": "healthy" if chat_instance else "unhealthy",
        "service": "Trinity Chat API",
        "timestamp": datetime.datetime.now(datetime.UTC).isoformat(),
        "trinity_initialized": chat_instance is not None
    }), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Endpoint not found",
        "status": "error"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal server error",
        "status": "error"
    }), 500

# For Vercel deployment
def handler(request):
    """Vercel serverless function handler"""
    return app(request.environ, lambda *args: None)