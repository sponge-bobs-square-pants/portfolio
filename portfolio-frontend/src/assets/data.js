export const projects = [
  {
    id: 1,
    title: 'Medical AI',
    description:
      'A medical AI Agent that provides booking appointments, cancelling or rescheduling appointments, Medical report analysis, Tips, reminders and more.',
    fullDescription:
      'This project involves developing an AI agent capable of handling various medical-related tasks. The agent can book, cancel, or reschedule appointments, analyze medical reports, and provide tips and reminders to patients. It aims to streamline administrative tasks in healthcare, making it easier for patients to manage their appointments and for doctors to provide timely care.\n Future plans include adding Blood banking, Pharmacies and Labs into the agent to help provide user everything in one place.',
    technologies: ['MongoDB', 'Langchain'],
    image:
      'https://images.pexels.com/photos/17483869/pexels-photo-17483869.jpeg',
    githubLink: 'https://github.com/GradScalerTeam/medical-swarm',
    liveLink: 'https://wa.me/+919009909910?text=hi',
    learnings: [
      'Langchain was used to create the agent flow initially, later switched to langgraph for dynamic flow and then further advanced it to langgraph-swarm architecture for seamless  conversation',
      'Mongo db is used to store user appointments, reminders, data, preferred hospital and other user based data.',
      'Integration is done over whatsapp to make it approachable and easy to use for the users.',
    ],
    timeline: {
      start: 'October 2024',
      end: 'December 2024',
      duration: '3 months',
    },
    color: '#9bc4cb',
  },
  {
    id: 2,
    title: 'Support Hero',
    description:
      'Designed with a focus of enhancing customer experience wether it be a support agent or a sales agent. It can answer queries, provide information, and assist with various tasks all based on your website or pdf or text.',
    fullDescription:
      'Support Hero is an AI-driven tool designed to assist customer support and sales agents. It can understand and respond to customer queries, provide detailed information, and assist with a variety of tasks. The AI is trained on your specific website content, PDFs, and other text resources to deliver accurate and helpful responses to the user 24/7.\n The agent was built taking into account the challenges faced by the customer.\n The portal is under development and once launched the live link will be updated.',
    technologies: ['React', 'Python', 'Langchain'],
    image:
      'https://images.pexels.com/photos/18069696/pexels-photo-18069696.png',
    githubLink: 'https://github.com/GradScalerTeam/ai-agents',
    liveLink: 'https://app.gradscaler.com',
    learnings: [
      'React.js was used to create the product panel which includes market place for multiple agents, agent configuration, integrations with whatsapp, website and other platforms and redux for state management',
      'Python was used for backend development, for storing user data, dashboard information and role based authentication',
      'Langchain was used for designing a dynamic user based ai agent flow on the fly, along with custom tools for website scrapping which performs better than fire-crawl.',
    ],
    timeline: {
      start: 'May 2025',
      end: '-',
      duration: '-',
    },
    color: '#cfebdf',
  },
  {
    id: 3,
    title: 'Product Law Coach',
    description:
      'A AI coach for product lawyers, designed to assist in legal learning and provide insights into product law.Creates various tasks, scenarios for the trainee to learn and practice.',
    fullDescription:
      'The Product Law Coach is an AI-powered application aimed at helping product lawyers learn and practice product law. It can create various legal scenarios and tasks for trainees, providing a practical learning experience. The AI coach offers insights and feedback, helping users to understand complex legal concepts and improve their skills. The AI also offers a role-play feature where trainee can interact with product manager and detect, analyze and provide feedback on the legal issues in the product.\n Future plans includes adding more types of challenges, scenarios, adding Mail and Telephonic conversation to help trainee navigate more real life scenarios, and more.',
    technologies: ['React', 'Node.js', 'Langchain', 'MongoDB'],
    image:
      'https://images.pexels.com/photos/18166547/pexels-photo-18166547/free-photo-of-back-view-of-woman-in-black-dress-on-sea-shore.jpeg',
    githubLink: 'https://github.com/GradScalerTeam/Product-Law-Coach',
    liveLink: 'https://www.productlawhub.com',
    learnings: [
      'React.js for building the user interface and redux for managing state',
      'Node.js for backend development and handling AI interactions',
      'Langchain for creating AI flows and managing complex legal scenarios',
      'MongoDB for storing user data, and feedback and dashboard data',
    ],
    timeline: {
      start: 'February 2025',
      end: 'July 2025',
      duration: '6 months',
    },
    color: '#e2fadb',
  },
  {
    id: 4,
    title: 'E-commerce Agent',
    description:
      'Designed to enhance the shopping experience by providing personalized recommendations, answering queries, and assisting users with finding products right on a single screen.',
    fullDescription:
      'The E-commerce Agent transforms shopping with intelligent recommendations, real-time query support, and tailored product discovery. Unlike traditional bots that clutter with irrelevant listings, it curates a streamlined experience, showing only products relevant to user preferences.\nWith WhatsApp integration, it resolves the inefficiency of earlier bots by displaying concise, need-based results. This makes shopping faster, simpler, and more enjoyable while maintaining user satisfaction through precise, personalized assistance. It also has cart management, order tracking, and more. Future plans include expanding this to other platforms, adding dynamic payment methods, price bargaining and more.',
    technologies: ['Langchain', 'PostgreSQL'],
    image: 'https://images.pexels.com/photos/5650021/pexels-photo-5650021.jpeg',
    githubLink: 'https://github.com/GradScalerTeam/alendei-projects',
    liveLink: 'https://wa.me/919909107813?text=E-commerce1',
    learnings: [
      'Langgraph has been used to build the agent flow, custom tools to help search products, manage cart, order tracking and more.',
      'PostgreSQL for managing product data, user preferences, and order history.',
    ],
    timeline: {
      start: 'Jan 2025',
      end: 'March 2025',
      duration: '3 months',
    },
    color: '#dbefbc',
  },
  {
    id: 5,
    title: 'Gabby AI',
    description:
      'Designed and created a web application to support a 3 way chat between parents and AI agent to discuss issues or topics, create schedules for their children and help resolve issues by mediating. Has custom calendar, socket integration, and more.',
    fullDescription:
      'Gabby AI is a web application designed to facilitate communication a three-way chat between parents and AI. It is a first of its kind AI agent that has been designed with a three-way chat feature, allowing parents to discuss issues, create schedules for their children and resolve issues by AI mediating. The application includes a customer calendar which creates events based on the chat, socket integration for real-time updates, agreement creation and more.\n Future plans include adding multi calendar support, Developing a mobile app/site and much more.',
    technologies: ['React', 'Node.js', 'Mongodb'],
    image: 'https://images.pexels.com/photos/8580799/pexels-photo-8580799.jpeg',
    githubLink: 'https://github.com/GradScalerTeam/GabbyAI',
    liveLink: 'https://app.betterparentingplan.com',
    learnings: [
      'React.js for building interactive user interfaces along with Redux toolkit for state management',
      'Node.js for backend development and socket integration for real-time communication, notifications, calendar events and more.',
      'Lang-graph for building AI agent flows along with custom tools, mem for memory management and more.',
    ],
    timeline: {
      start: 'April 2025',
      end: '-',
      duration: 'Ongoing',
    },
    color: '#F5E6B3',
  },
];
