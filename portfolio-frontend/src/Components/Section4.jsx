import React, { useState } from "react";
import { Send, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";

const Section4 = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! 👋 Thanks for checking out my work!",
      sender: "me",
      timestamp: "now",
    },
    {
      id: 2,
      text: "Let's connect and create something amazing together!",
      sender: "me",
      timestamp: "now",
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: "now",
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          text: "Got it! I'll get back to you soon 🚀",
          sender: "me",
          timestamp: "now",
        };
        setMessages((prev) => [...prev, reply]);
      }, 1000);
    }
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
                Quick Chat
              </h3>
              <p style={{ color: "#808181", margin: 0, fontSize: "0.85rem" }}>
                Online now
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              height: "300px",
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
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "0.75rem 1rem",
                    borderRadius: "1rem",
                    background:
                      msg.sender === "user"
                        ? "#F4D205"
                        : "rgba(255, 255, 255, 0.1)",
                    color: msg.sender === "user" ? "black" : "white",
                    fontSize: "0.9rem",
                    borderBottomRightRadius:
                      msg.sender === "user" ? "0.25rem" : "1rem",
                    borderBottomLeftRadius:
                      msg.sender === "user" ? "1rem" : "0.25rem",
                  }}
                >
                  {msg.text}
                </div>
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
              placeholder="Type your message..."
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
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                background: "#F4D205",
                border: "none",
                borderRadius: "50%",
                width: "45px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
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
              Interested in my work? Want to discuss opportunities?
              <br />
              Feel free to reach out through any of these channels.
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
