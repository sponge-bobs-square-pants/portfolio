import React, { useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Mongodb from "../assets/mongodb.svg";
import ReactImg from "../assets/react.svg";
import Nodejs from "../assets/node-js.svg";
import Langchain from "../assets/langchain-svg.svg";
import Postgres from "../assets/postgresql.svg";
import Python from "../assets/python.svg";
const Card = ({
  layoutId,
  title,
  description,
  technologies = [],
  i,
  image,
  src,
  projectNumber,
  color,
  progress,
  range,
  targetScale,
  id,
  onRemove,
  onExpand,
  onMinimize,
  isExpanded,
  isOtherCardExpanded,
  githubLink, // New prop for GitHub repository
  liveLink, // New prop for live demo
  fullDescription, // New prop for longer description
  challenges, // New prop for challenges faced
  learnings, // New prop for what was learned
  timeline, // New prop for project timeline
}) => {
  // Use src as fallback for image.
  const imageUrl = image || src;
  const offsetY = i * 60; // 60px offset between cards

  // Calculate scale directly without MotionValue overhead
  const scale = useMemo(() => {
    if (isExpanded) return 1;

    const [start, end] = range;
    const clampedProgress = Math.max(
      0,
      Math.min(1, (progress - start) / (end - start))
    );
    return 1 + (targetScale - 1) * clampedProgress;
  }, [progress, range, targetScale, isExpanded]);

  // Memoize transform values to prevent recalculation
  const cardTransform = useMemo(() => {
    if (isExpanded) {
      return "translateY(0px) scale(1.2)";
    }
    return `translateY(${offsetY - 60}px)`;
  }, [isExpanded, offsetY]);

  return (
    <motion.div
      className="cardContainer"
      layoutId={layoutId}
      layout={false} // Disable layout animation for better performance
      exit={{
        scale: 0.5,
        y: window.innerHeight,
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.32, 0, 0.67, 0],
        },
      }}
      style={{
        scale: scale,
        height: "100vh",
        display: isOtherCardExpanded ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: "0px",
        padding: "0 2rem",
        transformOrigin: "center",
        width: "100%", // Use 100% width for the container
        overflow: "hidden",
        pointerEvents: "auto",
      }}
      transition={{
        scale: {
          type: "tween", // Use tween instead of spring for better performance
          duration: 0.1,
          ease: "easeOut",
        },
        default: {
          type: "spring",
          damping: 25,
          stiffness: 120,
        },
      }}
    >
      <motion.div
        style={{
          background: color || "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          padding: isExpanded ? "3rem" : "3rem 3rem 0 3rem", // More padding at bottom when expanded
          width: "100%", // Full width
          maxWidth: "800px", // Keep max width consistent
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          transform: cardTransform,
          zIndex: isExpanded ? 1000 : `${100 - i}`,
          transformOrigin: "center center",
        }}
        transition={{
          transform: {
            type: "tween",
            duration: 0.2,
            ease: "easeOut",
          },
        }}
      >
        {/* New Top Left Buttons */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            display: "flex",
            gap: "0.5rem",
            zIndex: 2,
          }}
        >
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              console.log("Remove project", i + 1);
              onRemove(id);
            }}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, transition: { duration: 0.2 } }}
              style={{ fontSize: "10px", color: "white" }}
            >
              ×
            </motion.span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onMinimize && onMinimize()} // Add minimize handler
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, transition: { duration: 0.2 } }}
              style={{ fontSize: "10px", color: "white" }}
            >
              –
            </motion.span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onExpand && onExpand(id)} // Add expand handler
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#27c93f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, transition: { duration: 0.2 } }}
              style={{ fontSize: "10px", color: "white" }}
            >
              +
            </motion.span>
          </motion.div>
        </div>
        {projectNumber && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ccc",
            }}
          >
            {projectNumber}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: isExpanded ? "column" : "row", // Stack vertically when expanded
            flex: 1,
          }}
        >
          {/* Content changes based on expanded state */}
          {isExpanded ? (
            // Expanded view with additional information
            <>
              <div style={{ marginBottom: "1.2rem" }}>
                <h2
                  style={{
                    fontSize: "1.4rem", // Reduced from 2.4rem
                    marginBottom: "0.6rem", // Reduced from 0.8rem
                    color: "#333",
                  }}
                >
                  {title}
                </h2>
                {/* Project links */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem", // Reduced from 0.8rem
                    marginBottom: "1rem", // Reduced from 1.2rem
                  }}
                >
                  {githubLink && (
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem", // Reduced from 0.4rem
                        padding: "0.3rem 0.6rem", // Reduced from 0.4rem 0.8rem
                        background: "#333",
                        color: "white",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontSize: "0.7rem", // Reduced from 0.8rem
                        fontWeight: "500",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        {" "}
                        {/* Reduced from 16x16 */}
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                      </svg>
                      GitHub
                    </a>
                  )}

                  {liveLink && (
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem", // Reduced from 0.4rem
                        padding: "0.3rem 0.6rem", // Reduced from 0.4rem 0.8rem
                        background: "#4a90e2",
                        color: "white",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontSize: "0.7rem", // Reduced from 0.8rem
                        fontWeight: "500",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        {" "}
                        {/* Reduced from 16x16 */}
                        <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
                <p
                  style={{
                    fontSize: "0.8rem", // Reduced from 0.95rem 0.85
                    lineHeight: "1.4", // Reduced from 1.5
                    marginBottom: "1.2rem", // Reduced from 1.5rem
                    color: "#555",
                  }}
                >
                  {fullDescription || description}
                </p>
                {/* Two-column layout for additional details */}
                <div
                  style={{
                    display: "flex",
                    gap: "1.2rem", // Reduced from 1.5rem
                    marginBottom: "0rem", // Reduced from 1.5rem
                  }}
                >
                  {/* Left column */}
                  <div style={{ flex: 1 }}>
                    {learnings && learnings.length > 0 && (
                      <div>
                        <h4
                          style={{
                            fontSize: "0.85rem", // Reduced from 1rem
                            marginBottom: "0.3rem", // Reduced from 0.4rem
                            color: "#333",
                            fontWeight: "600",
                          }}
                        >
                          Technology Brief
                        </h4>
                        <ul
                          style={{
                            paddingLeft: "1rem", // Reduced from 1.2rem
                            color: "#555",
                            margin: "0.4rem 0", // Reduced from 0.5rem
                            fontSize: "0.8rem", // Reduced from 0.9rem
                          }}
                        >
                          {learnings.map((learning, idx) => (
                            <li key={idx} style={{ marginBottom: "0.2rem" }}>
                              {" "}
                              {/* Reduced from 0.3rem */}
                              {learning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right column */}
                  <div style={{ flex: 1 }}>
                    {timeline && (
                      <div>
                        <h4
                          style={{
                            fontSize: "0.85rem", // Reduced from 1rem
                            marginBottom: "0.3rem", // Reduced from 0.4rem
                            color: "#333",
                            fontWeight: "600",
                          }}
                        >
                          Timeline
                        </h4>
                        <div style={{ color: "#555", fontSize: "0.8rem" }}>
                          {" "}
                          {/* Reduced from 0.9rem */}
                          <p style={{ margin: "0.2rem 0" }}>
                            {" "}
                            {/* Reduced from 0.3rem */}
                            Started: {timeline.start}
                          </p>
                          <p style={{ margin: "0.2rem 0" }}>
                            {" "}
                            {/* Reduced from 0.3rem */}
                            Completed: {timeline.end}
                          </p>
                          <p style={{ margin: "0.2rem 0" }}>
                            {" "}
                            {/* Reduced from 0.3rem */}
                            Duration: {timeline.duration}
                          </p>
                        </div>
                        <div>
                          <h4
                            style={{
                              marginTop: "1.7rem",
                              fontSize: "0.85rem", // Reduced from 1rem
                              marginBottom: "0.5rem", // Reduced from 0.6rem
                              color: "#333",
                              fontWeight: "600",
                            }}
                          >
                            Technologies Used
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.4rem", // Reduced from 0.5rem
                            }}
                          >
                            {technologies &&
                              technologies.map((tech, index) => (
                                <span
                                  key={index}
                                  style={{
                                    background: "#f0f0f0",
                                    padding: "0.3rem 0.6rem", // Reduced from 0.3rem 0.7rem
                                    borderRadius: "12px", // Reduced from 16px
                                    fontSize: "0.7rem", // Reduced from 0.8rem
                                    color: "#555",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.2rem", // Reduced from 0.3rem
                                  }}
                                >
                                  {getTechIcon(tech)}
                                  {tech}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Technologies with more details */}
            </>
          ) : (
            // Normal view (unchanged)
            <>
              {/* Left Column 60%: current content */}
              <div style={{ width: "60%", paddingRight: "1rem" }}>
                <h3
                  style={{
                    fontSize: "2.8rem",
                    marginBottom: "1rem",
                    color: "#333",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                    color: "#555",
                  }}
                >
                  {description}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "auto",
                  }}
                >
                  {technologies &&
                    technologies.map((tech, index) => (
                      <span
                        key={index}
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
              {/* Right Column 40: image */}
              <div
                style={{
                  width: "40%",
                  paddingTop: "2rem",
                  paddingLeft: "1rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title}
                    style={{
                      display: "block", // ensures the image is treated as a block element
                      margin: "0 auto", // centers the image horizontally
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "gray",
                      borderRadius: "12px",
                    }}
                  >
                    No image
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper function to get technology icons
function getTechIcon(tech) {
  const lowerTech = tech.toLowerCase();

  // Return appropriate SVG icon based on technology
  if (lowerTech.includes("react")) {
    return <img src={ReactImg} alt="React" style={{ width: "14px" }} />;
  } else if (lowerTech.includes("node")) {
    return <img src={Nodejs} alt="Node.js" style={{ width: "14px" }} />;
  } else if (lowerTech.includes("mongodb")) {
    return <img src={Mongodb} style={{ width: "12px" }} />;
  } else if (lowerTech.includes("langchain")) {
    return <img src={Langchain} alt="Langchain" style={{ width: "14px" }} />;
  } else if (lowerTech.includes("postgres")) {
    return <img src={Postgres} alt="Postgres" style={{ width: "14px" }} />;
  } else if (lowerTech.includes("python")) {
    return <img src={Python} alt="Python" style={{ width: "12px" }} />;
  } else {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#777">
        <path d="M12 2L1 21h22L12 2zm0 4l7 14H5l7-14z" />
      </svg>
    );
  }
}

export default Card;
