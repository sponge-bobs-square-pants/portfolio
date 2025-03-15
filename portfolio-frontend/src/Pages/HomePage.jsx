import React, { useState } from "react";
import LoadingAnimation from "../Components/LoadingAnimation";
import Navbar from "../Components/Navbar";

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: loaded ? -1 : 100,
        }}
      >
        <LoadingAnimation onComplete={() => setLoaded(true)} />
      </div>

      {/* Fixed Navbar on top of content */}
      <div
        style={{
          position: "fixed",
          top: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
        }}
      >
        <Navbar />
      </div>

      {/* Full-screen scrollable content container */}
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        <div
          id="section1"
          style={{
            height: "100vh",
            width: "100vw",
            scrollSnapAlign: "start",
          }}
        >
          Section 1
        </div>
        <div
          id="section2"
          style={{
            height: "100vh",
            width: "100vw",
            scrollSnapAlign: "start",
          }}
        >
          Section 2
        </div>
        <div
          id="section3"
          style={{
            height: "100vh",
            width: "100vw",
            scrollSnapAlign: "start",
          }}
        >
          Section 3
        </div>
        {/* ...additional sections as needed... */}
      </div>
    </div>
  );
};

export default HomePage;
