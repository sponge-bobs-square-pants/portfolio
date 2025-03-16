import React from "react";
import { projects } from "../assets/data";
import Card from "./Card";

const ProjectsSection = () => {
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
        style={{
          width: "70%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {projects.map((project, index) => {
          return <Card key={index} i={index} {...project} />;
        })}
      </div>
    </div>
  );
};

export default ProjectsSection;
