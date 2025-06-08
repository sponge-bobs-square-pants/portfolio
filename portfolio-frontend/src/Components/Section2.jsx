import React, { useRef, useState } from "react";
import { projects as initialProjects } from "../assets/data";
import Card from "./Card";
import { AnimatePresence } from "framer-motion";

const ProjectsSection = () => {
  const container = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectList, setProjectList] = useState(initialProjects);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const progress = scrollTop / (scrollHeight - clientHeight);
    setScrollProgress(progress);
  };

  const handleRemove = (projectNumber) => {
    console.log("Removing project with number:", projectNumber);
    setProjectList((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectNumber)
    );
  };

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
          display: "flex",
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
          overflowY: "auto",
        }}
      >
        <AnimatePresence>
          {projectList.map((project, index) => {
            const targetScale = 1 - (projectList.length - index) * 0.05;
            return (
              <Card
                key={project.projectNumber || index}
                i={index}
                {...project}
                progress={scrollProgress}
                range={[index * 0.25, 1]}
                targetScale={targetScale}
                onRemove={(i) => handleRemove(i)}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsSection;
