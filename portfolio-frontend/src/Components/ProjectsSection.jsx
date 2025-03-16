import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProjectsSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const containerRef = useRef(null);

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Project One",
      description:
        "This is a description of my first project. Here I can provide details about what technologies I used and what challenges I overcame.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/path-to-image.jpg", // Add your image path
    },
    {
      id: 2,
      title: "Project Two",
      description:
        "This is a description of my first project. Here I can provide details about what technologies I used and what challenges I overcame.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/path-to-image.jpg", // Add your image path
    },
    {
      id: 3,
      title: "Project Three",
      description:
        "This is a description of my first project. Here I can provide details about what technologies I used and what challenges I overcame.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/path-to-image.jpg", // Add your image path
    },
    {
      id: 4,
      title: "Project Four",
      description:
        "This is a description of my first project. Here I can provide details about what technologies I used and what challenges I overcame.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/path-to-image.jpg", // Add your image path
    },
  ];

  // Use Framer Motion's scroll utilities
  const { scrollY } = useScroll({ container: containerRef });

  // Update active card based on scroll position
  useEffect(() => {
    return scrollY.onChange((value) => {
      if (!containerRef.current) return;

      const containerHeight = containerRef.current.clientHeight;
      const scrollUnit = containerHeight * 0.18;
      const index = Math.min(
        Math.floor(value / scrollUnit),
        projects.length - 1
      );

      setActiveCardIndex(index);
    });
  }, [scrollY, projects.length]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        scrollSnapAlign: "start",
        background: "transparent",
      }}
    >
      <style>
        {`
        .scroll-linked-card {
          animation-timeline: scroll(root);
          animation-range: entry 0% cover 50%;
        }
      `}
      </style>
      {/* Left Column - 30% */}
      <div
        style={{
          width: "30%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 2rem",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          My Projects
        </h2>

        {/* Horizontal project indicators */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1.5rem",
          }}
        >
          {projects.map((_, index) => (
            <motion.div
              key={index}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                margin: "0 0.5rem 0 0",
              }}
              animate={{
                backgroundColor: index === activeCardIndex ? "#333" : "#ddd",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
            lineHeight: "1.6",
          }}
        >
          Here are some of the projects I've worked on. Scroll down to discover
          more projects.
        </p>
      </div>

      {/* Right Column - 70% with scrollable cards */}
      <div
        style={{
          width: "70%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* This is the scrollable container */}
        <div
          ref={containerRef}
          style={{
            height: "100%",
            overflowY: "scroll",
            paddingTop: "30vh", // Add space at top
            paddingBottom: "100vh", // Add lots of space at bottom to allow scrolling
          }}
        >
          {/* Create a tall content area to enable scrolling */}
          <div
            style={{
              minHeight: `${projects.length * 50}vh`, // Make tall enough for scrolling
              position: "relative",
              paddingRight: "2rem",
              paddingLeft: "2rem",
            }}
          >
            {/* Cards container - fixed position relative to viewport */}
            <div
              style={{
                position: "sticky",
                top: "50%",
                transform: "translateY(-50%)",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Stack of cards */}
              {projects.map((project, index) => {
                // Cards stack on top (highest index is on top)
                const isVisible = index <= activeCardIndex;

                return (
                  <motion.div
                    className="scroll-linked-card"
                    key={project.id}
                    style={{
                      position: "absolute",
                      width: "100%",
                      // Reverse the z-index so higher index (newer cards) are on top
                      zIndex: index + 1,
                      pointerEvents: isVisible ? "auto" : "none",
                    }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      // Adjust y-value calculation to match your original stacking
                      y: isVisible ? (index - activeCardIndex) * 50 : 400, // Push cards that should be hidden far below
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120, // Lower from 300
                      damping: 60, // Higher from 30
                      mass: 1.5, // Added mass
                      opacity: { duration: 0.5 }, // Longer opacity transition
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        marginTop: "50%",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        padding: "3rem",
                        width: "100%",
                        minHeight: "400px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.8rem",
                          marginBottom: "1rem",
                          color: "#333",
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "1rem",
                          lineHeight: "1.6",
                          marginBottom: "1.5rem",
                          color: "#555",
                        }}
                      >
                        {project.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginTop: "auto",
                        }}
                      >
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            style={{
                              background: "#f0f0f0",
                              padding: "0.5rem 1rem",
                              borderRadius: "20px",
                              fontSize: "0.9rem",
                              marginRight: "0.5rem",
                              marginBottom: "0.5rem",
                              color: "#555",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
