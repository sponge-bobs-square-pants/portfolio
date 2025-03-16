import React, { useRef, useState } from "react";
import { projects } from "../assets/data";
import Card from "./Card";

const ProjectsSection = () => {
  const container = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const progress = scrollTop / (scrollHeight - clientHeight);
    // console.log("Scroll progress:", progress);
    setScrollProgress(progress);
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
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          My Projects
        </h2>
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

      {/* Right Column - 70% */}
      <div
        ref={container}
        onScroll={handleScroll}
        style={{
          width: "70%",
          height: "100vh", // ensure full viewport height
          overflowY: "auto",
        }}
      >
        {projects.map((project, index) => {
          const targetScale = 1 - (projects.length - index) * 0.05; // "index" should be used here instead of "i"
          return (
            <Card
              key={index}
              i={index}
              {...project}
              progress={scrollProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsSection;
