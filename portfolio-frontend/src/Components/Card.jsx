import React, { useRef, useEffect } from "react";
import { useMotionValue, useTransform, motion, useSpring } from "framer-motion";

const Card = ({
  layoutId,
  title,
  description,
  technologies = [],
  i,
  image,
  src,
  projectNumber,
  color, // new property from data
  progress, // plain number progress from Section2
  range,
  targetScale,
  id,
  onRemove, // added onRemove prop
}) => {
  // Use src as fallback for image.
  const imageUrl = image || src;
  const offsetY = i * 60; // 60px offset between cards

  // Convert progress to a MotionValue
  const progressMV = useMotionValue(0);

  useEffect(() => {
    // Smooth the progress updates to prevent jerkiness
    const smoothUpdate = () => {
      const current = progressMV.get();
      const diff = progress - current;

      if (Math.abs(diff) < 0.001) return;

      // Use a smaller interpolation factor for smoother movement
      progressMV.set(current + diff * 0.15);
      requestAnimationFrame(smoothUpdate);
    };

    requestAnimationFrame(smoothUpdate);
  }, [progress, progressMV]);

  // Create a motion scale value based on progressMV
  const scale = useTransform(progressMV, range, [1, targetScale]);

  return (
    <motion.div
      className="cardContainer"
      layoutId={layoutId}
      layout
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
        scale, // using MotionValue scale
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: "0px", // All cards stick to the top
        padding: "0 2rem",
        transformOrigin: "center",
      }}
      transition={{
        type: "tween",
        ease: [0.25, 0.1, 0.25, 1], // A more responsive cubic bezier
        duration: 0.3, // Shorter duration to keep up with fast scrolling
      }}
    >
      <motion.div
        style={{
          background: color || "white", // updated to use color from data
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          padding: "3rem 3rem 0 3rem", // updated bottom padding to 0
          width: "100%",
          maxWidth: "800px",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          position: "relative", // needed for absolute positioning
          transform: `translateY(${offsetY - 60}px)`, // Apply a constant -60px offset plus the index-based offset
          zIndex: `${100 - i}`, // Higher cards appear on top
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 30,
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
            }} // added onClick event
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
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
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
              height: "100%", // added to ensure full column height
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
