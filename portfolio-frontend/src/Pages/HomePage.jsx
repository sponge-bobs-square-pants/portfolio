import React, { useState, useEffect } from "react";
import LoadingAnimation from "../Components/LoadingAnimation";
import Navbar from "../Components/Navbar";
import Introduction from "../Components/Introduction";
import Section2 from "../Components/Section2";

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // Handle the staged transitions
  useEffect(() => {
    if (loaded) {
      // Wait a short delay before beginning to show content
      const contentTimer = setTimeout(() => {
        setContentVisible(true);
      }, 500);

      return () => clearTimeout(contentTimer);
    }
  }, [loaded]);

  // Function to handle loading completion from animation
  const handleAnimationComplete = () => {
    setLoaded(true);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Loading animation layer - stays visible as background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <LoadingAnimation onComplete={handleAnimationComplete} />
      </div>

      {/* Fixed Navbar on top of content - properly centered */}
      <div
        style={{
          position: "fixed",
          top: "8px",
          left: 0,
          width: "100%", // Full width
          display: "flex",
          justifyContent: "center", // Center horizontally
          zIndex: 50,
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 2s ease 0.5s",
        }}
      >
        <Navbar />
      </div>

      {/* Full-screen scrollable content container with slow fade and transform */}
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          opacity: contentVisible ? 1 : 0,
          transform: `translateY(${contentVisible ? "0" : "40px"})`,
          transition: "opacity 2.5s ease, transform 2.5s ease",
          position: "relative",
          zIndex: 10,
          background: "transparent",
        }}
      >
        <div
          id="section1"
          style={{
            height: "100vh",
            width: "100vw",
            scrollSnapAlign: "start",
            margin: 0,
            padding: 0,
            // fontSize: "2rem",
            opacity: contentVisible ? 1 : 0,
            // Removed transform animation to prevent slight backward movement
            // transform: `translateY(${contentVisible ? "0" : "20px"})`,
            transition: "opacity 3s ease 0.2s",
            background: "transparent",
          }}
        >
          <Introduction />
        </div>
        <div
          id="section2"
          style={{
            height: "100vh",
            width: "100vw",
            scrollSnapAlign: "start",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            opacity: contentVisible ? 1 : 0,
            // Removed transform animation to prevent slight backward movement
            // transform: `translateY(${contentVisible ? "0" : "20px"})`,
            transition: "opacity 3s ease 0.4s",
            background: "transparent",
          }}
        >
          <Section2 />
        </div>
        <div
          id="section3"
          style={{
            height: "100vh",
            width: "100vw",
            scrollSnapAlign: "start",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            opacity: contentVisible ? 1 : 0,
            // Removed transform animation to prevent slight backward movement
            // transform: `translateY(${contentVisible ? "0" : "20px"})`,
            transition: "opacity 3s ease 0.6s",
            background: "transparent",
          }}
        >
          Section 3
        </div>
      </div>
    </div>
  );
};

export default HomePage;
