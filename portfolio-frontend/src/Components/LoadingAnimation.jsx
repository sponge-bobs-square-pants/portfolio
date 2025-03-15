import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <>
      <div
        style={{
          padding: 0,
          position: "fixed",
          left: 0,
          top: 0,
          width: "100dvw",
          height: "100dvh",
          pointerEvents: "none",
          overflow: "hidden",
          background: "#FEFFFC",
        }}
      >
        {/* Very subtle light gradient overlay */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, #FEFFFC, #F5F6F4)",
            zIndex: 0,
          }}
        />

        {/* Sun animation container with off-screen starting position */}
        <motion.div
          initial={{ rotate: 0, marginLeft: "30dvw", marginTop: "0" }}
          animate={{ rotate: -90, marginLeft: "-18dvw", marginTop: "-40dvh" }}
          transition={{
            duration: 3,
            ease: "linear",
            // times: [0, 1],
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            transformOrigin: "50% 50%",
            zIndex: 2,
            willChange: "transform",
          }}
        >
          {/* Sun core with extended bright yellow */}
          <div
            style={{
              transform: "translateX(calc(50vw - 250px))",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              //   background:
              //     "radial-gradient(circle, #FFE142 0%, #FFD700 60%, rgba(255, 235, 0, 0.95) 80%, rgba(255, 235, 0, 0.9) 100%)",
              background:
                "radial-gradient(circle, #F1C40F 0%, #E6B800 60%, rgba(230, 184, 0, 0.95) 80%, rgba(230, 184, 0, 0.9) 100%)",
              filter: "blur(80px)",
              position: "relative",
              mixBlendMode: "screen",
            }}
          >
            {/* Light effect with extended reach */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "1400px", // Increased from 1200px
                height: "1400px", // Increased from 1200px
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255, 225, 66, 0.9) 0%, rgba(255, 225, 0, 0.8) 15%, rgba(255, 225, 0, 0.6) 30%, rgba(255, 225, 0, 0.3) 55%, rgba(255, 225, 0, 0.1) 75%, rgba(0, 0, 0, 0) 90%)",
                filter: "blur(120px)",
                boxShadow: "0 0 250px 150px rgba(255, 235, 0, 0.25)", // Extended shadow
                zIndex: -1,
                mixBlendMode: "screen",
              }}
            />
          </div>
        </motion.div>

        {/* Extremely subtle shading gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundImage: `
              radial-gradient(
                circle at 50% 50%, 
                transparent 10%, 
                rgba(0, 0, 0, 0.01) 30%, 
                rgba(0, 0, 0, 0.02) 50%, 
                rgba(0, 0, 0, 0.03) 70%,
                rgba(0, 0, 0, 0.05) 90%
              )
            `,
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
};

export default LoadingAnimation;
