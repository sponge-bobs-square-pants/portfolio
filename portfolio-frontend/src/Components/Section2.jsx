import React, { useRef, useState, useEffect, useCallback } from "react";
import { projects as initialProjects } from "../assets/data";
import Card from "./Card";
import { AnimatePresence } from "framer-motion";

const ProjectsSection = () => {
  const container = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectList, setProjectList] = useState(initialProjects);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const scrollingRef = useRef(false);
  const rafRef = useRef(null); // Add RAF reference

  // Throttle scroll updates using requestAnimationFrame
  const handleScroll = useCallback(
    (e) => {
      if (expandedCardId !== null) return;

      // Cancel previous RAF if still pending
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const progress = scrollTop / (scrollHeight - clientHeight);

        scrollingRef.current = true;
        setScrollProgress(progress);

        // Debounce scroll position saving
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          scrollingRef.current = false;
          setSavedScrollPosition(scrollTop);
        }, 50); // Reduced debounce time
      });
    },
    [expandedCardId]
  );

  // Use a more stable approach to restore scroll position
  useEffect(() => {
    if (
      expandedCardId === null &&
      container.current &&
      savedScrollPosition > 0
    ) {
      // Use requestAnimationFrame for smoother restoration
      requestAnimationFrame(() => {
        container.current.scrollTop = savedScrollPosition;
      });
    }
  }, [expandedCardId]);

  const handleRemove = (projectNumber) => {
    console.log("Removing project with number:", projectNumber);
    setProjectList((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectNumber)
    );

    // If removing the expanded card, reset expanded state
    if (expandedCardId === projectNumber) {
      setExpandedCardId(null);
    }
  };

  // Handle card expansion
  const handleExpand = (projectId) => {
    if (container.current && !scrollingRef.current) {
      setSavedScrollPosition(container.current.scrollTop);
    }
    setExpandedCardId(projectId);
  };

  // Handle card minimization
  const handleMinimize = () => {
    setExpandedCardId(null);
  };

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        background: "transparent",
      }}
    >
      {/* Left Column - 30% */}
      <div
        style={{
          width: "30%",
          height: "100%",
          display: "flex", // Always show the left column
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 2rem",
        }}
      >
        <h2
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          My Projects
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#666", lineHeight: "1.6" }}>
          Here are some of my most recent projects. Scroll over them to see the
          projects.
        </p>
      </div>

      {/* Right Column - 70% */}
      <div
        ref={container}
        onScroll={handleScroll}
        style={{
          width: "70%",
          height: "100vh",
          overflowY: expandedCardId !== null ? "hidden" : "auto",
          overflowX: "hidden",
          position: "relative",
          // Add hardware acceleration
          willChange: expandedCardId === null ? "scroll-position" : "auto",
        }}
      >
        <AnimatePresence mode="popLayout">
          {" "}
          {/* Add mode for better performance */}
          {projectList.map((project, index) => {
            const targetScale = 1 - (projectList.length - index) * 0.05;
            return (
              <Card
                key={project.id} // Use ID instead of index for better React reconciliation
                i={index}
                {...project}
                progress={scrollProgress}
                range={[index * 0.25, 1]}
                targetScale={targetScale}
                onRemove={handleRemove}
                onExpand={handleExpand}
                onMinimize={handleMinimize}
                isExpanded={expandedCardId === project.id}
                isOtherCardExpanded={
                  expandedCardId !== null && expandedCardId !== project.id
                }
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsSection;
