import React, { useState, useEffect } from "react";
import {
  Send,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Github,
  ExternalLink,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  NewConversation,
  TrinityChat,
  addMessage,
} from "../features/chatSlice";

const Section4 = () => {
  const [message, setMessage] = useState("");
  const { messages, thread_id, ChatStatus } = useSelector(
    (state) => state.chat
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(NewConversation());
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "" || !thread_id || ChatStatus.isPending) return;

    // Add user message to local state first
    dispatch(addMessage({ text: message }));

    // Send message to API
    dispatch(
      TrinityChat({
        message: message,
        thread_id: thread_id,
      })
    );

    // Clear input
    setMessage("");
  };

  const handleSuggestedQuestion = (question) => {
    if (ChatStatus.isPending || !thread_id) return;

    dispatch(addMessage({ text: question }));
    dispatch(
      TrinityChat({
        message: question,
        thread_id: thread_id,
      })
    );
  };

  const getIconComponent = (iconName) => {
    const icons = {
      linkedin: Linkedin,
      mail: Mail,
      github: Github,
      instagram: Instagram,
      email: Mail,
    };
    return icons[iconName.toLowerCase()] || Mail;
  };

  const renderSocialLinks = (socialLinks) => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className="social-links-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "0.75rem",
        }}
      >
        {socialLinks.map((social, index) => {
          const IconComponent = getIconComponent(social.icon);
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem",
                background: "rgba(244, 210, 5, 0.1)",
                borderRadius: "0.5rem",
                border: "1px solid rgba(244, 210, 5, 0.3)",
                color: "white",
                textDecoration: "none",
                transition: "all 0.2s ease",
                fontSize: "0.85rem",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(244, 210, 5, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(244, 210, 5, 0.1)";
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  background: "#F4D205",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconComponent
                  style={{ width: "12px", height: "12px", color: "black" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600" }}>{social.name}</div>
                <div style={{ color: "#B0B0B0", fontSize: "0.75rem" }}>
                  {social.handle}
                </div>
              </div>
              <ExternalLink
                style={{ width: "14px", height: "14px", color: "#F4D205" }}
              />
            </a>
          );
        })}
      </div>
    );
  };

  const renderProjects = (projects) => {
    if (!projects || projects.length === 0) return null;

    return (
      <div
        className="projects-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginTop: "0.75rem",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              padding: "0.75rem",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "0.5rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <h4
                style={{
                  color: "#F4D205",
                  margin: 0,
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                {project.name}
              </h4>
              <span
                style={{
                  color: "#B0B0B0",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                }}
              >
                {project.company}
              </span>
            </div>

            <p
              style={{
                color: "white",
                margin: "0 0 0.5rem 0",
                fontSize: "0.8rem",
                lineHeight: "1.4",
              }}
            >
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.25rem",
                  marginBottom: "0.5rem",
                }}
              >
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    style={{
                      background: "rgba(244, 210, 5, 0.2)",
                      color: "#F4D205",
                      padding: "0.125rem 0.375rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.7rem",
                      fontWeight: "500",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.impact && (
              <p
                style={{
                  color: "#B0B0B0",
                  margin: 0,
                  fontSize: "0.75rem",
                  fontStyle: "italic",
                }}
              >
                {project.impact}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSuggestedQuestions = (questions) => {
    if (!questions || questions.length === 0) return null;

    return (
      <div
        className="suggested-questions"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "0.75rem",
        }}
      >
        <div
          style={{
            color: "#B0B0B0",
            fontSize: "0.75rem",
            fontWeight: "500",
          }}
        >
          Suggested questions:
        </div>
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleSuggestedQuestion(question)}
            disabled={ChatStatus.isPending}
            style={{
              background: "transparent",
              border: "1px solid rgba(244, 210, 5, 0.3)",
              borderRadius: "0.375rem",
              padding: "0.5rem 0.75rem",
              color: "#F4D205",
              fontSize: "0.75rem",
              cursor: ChatStatus.isPending ? "not-allowed" : "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              opacity: ChatStatus.isPending ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!ChatStatus.isPending) {
                e.target.style.background = "rgba(244, 210, 5, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            {question}
          </button>
        ))}
      </div>
    );
  };

  const renderMessage = (msg) => {
    // Handle structured responses
    if (msg.response) {
      const {
        message: text,
        type,
        social_links,
        projects,
        suggested_questions,
      } = msg.response;

      return (
        <div
          style={{
            maxWidth: "85%",
            padding: "0.75rem 1rem",
            borderRadius: "1rem",
            background: "rgba(255, 255, 255, 0.1)",
            color: "white",
            fontSize: "0.9rem",
            borderBottomLeftRadius: "0.25rem",
          }}
        >
          <div>{text}</div>
          {renderSocialLinks(social_links)}
          {renderProjects(projects)}
          {renderSuggestedQuestions(suggested_questions)}
        </div>
      );
    }

    // Handle regular text messages
    return (
      <div
        style={{
          maxWidth: "70%",
          padding: "0.75rem 1rem",
          borderRadius: "1rem",
          background:
            msg.sender === "user" ? "#F4D205" : "rgba(255, 255, 255, 0.1)",
          color: msg.sender === "user" ? "black" : "white",
          fontSize: "0.9rem",
          borderBottomRightRadius: msg.sender === "user" ? "0.25rem" : "1rem",
          borderBottomLeftRadius: msg.sender === "user" ? "1rem" : "0.25rem",
        }}
      >
        {msg.text}
      </div>
    );
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/partee_party",
      handle: "@partee_party",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/parth-chawla",
      handle: "parth-chawla",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:parthchawla65@gmail.com",
      handle: "parthchawla65@gmail.com",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Chat Interface */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            borderRadius: "1rem",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              background: "rgba(244, 210, 5, 0.1)",
              padding: "1rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#F4D205",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageCircle
                style={{ width: "20px", height: "20px", color: "black" }}
              />
            </div>
            <div>
              <h3
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                }}
              >
                Trinity Assistant
              </h3>
              <p style={{ color: "#808181", margin: 0, fontSize: "0.85rem" }}>
                {ChatStatus.isPending ? "Typing..." : "Online now"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              height: "400px",
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {renderMessage(msg)}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div
            style={{
              padding: "1rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              gap: "0.75rem",
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about Parth's projects, skills, or contact info..."
              disabled={ChatStatus.isPending || !thread_id}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(e);
                }
              }}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "2rem",
                color: "white",
                fontSize: "0.9rem",
                outline: "none",
                opacity: ChatStatus.isPending || !thread_id ? 0.6 : 1,
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={
                ChatStatus.isPending || !thread_id || message.trim() === ""
              }
              style={{
                background:
                  ChatStatus.isPending || !thread_id || message.trim() === ""
                    ? "rgba(244, 210, 5, 0.5)"
                    : "#F4D205",
                border: "none",
                borderRadius: "50%",
                width: "45px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor:
                  ChatStatus.isPending || !thread_id || message.trim() === ""
                    ? "not-allowed"
                    : "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (
                  !ChatStatus.isPending &&
                  thread_id &&
                  message.trim() !== ""
                ) {
                  e.target.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              <Send style={{ width: "18px", height: "18px", color: "black" }} />
            </button>
          </div>
        </div>

        {/* Social Links & Info */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div>
            <h2
              style={{
                color: "black",
                fontSize: "2.5rem",
                fontWeight: "bold",
                margin: "0 0 0.5rem 0",
                lineHeight: "1.2",
              }}
            >
              Let's Connect
            </h2>
            <p
              style={{
                color: "#808181",
                fontSize: "1.1rem",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              Chat with Trinity to learn about my work, projects, and
              experience.
              <br />
              Or reach out directly through these channels.
            </p>
          </div>

          {/* Social Links */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: "white",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "black",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      background: "black",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                  </div>
                  <div>
                    <h4
                      style={{ margin: 0, fontSize: "1rem", fontWeight: "600" }}
                    >
                      {social.name}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        color: "#808181",
                      }}
                    >
                      {social.handle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
