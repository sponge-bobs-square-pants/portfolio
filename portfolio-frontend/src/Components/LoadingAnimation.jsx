import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = ({ onComplete }) => {
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
          initial={{
            rotate: 0,
            marginLeft: "30dvw",
            marginTop: "0",
          }}
          animate={{
            rotate: -90,
            marginLeft: "-18dvw",
            marginTop: "-40dvh",
          }}
          transition={{
            duration: 3,
            ease: "linear",
          }}
          onAnimationComplete={() => onComplete && onComplete()}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) translateZ(0)",
            transformOrigin: "50% 50%",
            zIndex: 2,
            willChange: "transform",
          }}
        >
          {/* Sun core with color animation */}
          <motion.div
            initial={{
              background:
                "radial-gradient(circle, #F1C40F 0%, #E67E22 60%, rgba(230, 126, 34, 0.95) 80%, rgba(230, 126, 34, 0.9) 100%)",
            }}
            animate={{
              background:
                "radial-gradient(circle, #FFE142 0%, #FFD700 60%, rgba(255, 235, 0, 0.95) 80%, rgba(255, 235, 0, 0.9) 100%)",
            }}
            transition={{
              duration: 3,
              ease: "linear",
            }}
            style={{
              transform: "translateX(calc(50vw - 250px)) translateZ(0)",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              filter: "blur(80px)",
              position: "relative",
              mixBlendMode: "screen",
              willChange: "background",
            }}
          >
            {/* Light effect with color animation */}
            <motion.div
              initial={{
                background:
                  "radial-gradient(circle, rgba(255, 225, 66, 0.9) 0%, rgba(255, 167, 38, 0.8) 15%, rgba(255, 152, 0, 0.6) 30%, rgba(255, 138, 0, 0.3) 55%, rgba(255, 126, 0, 0.1) 75%, rgba(0, 0, 0, 0) 90%)",
                boxShadow: "0 0 250px 150px rgba(255, 167, 38, 0.25)",
              }}
              animate={{
                background:
                  "radial-gradient(circle, rgba(255, 225, 66, 0.9) 0%, rgba(255, 225, 0, 0.8) 15%, rgba(255, 225, 0, 0.6) 30%, rgba(255, 225, 0, 0.3) 55%, rgba(255, 225, 0, 0.1) 75%, rgba(0, 0, 0, 0) 90%)",
                boxShadow: "0 0 250px 150px rgba(255, 235, 0, 0.25)",
              }}
              transition={{
                duration: 3,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) translateZ(0)",
                width: "1400px",
                height: "1400px",
                borderRadius: "50%",
                filter: "blur(120px)",
                zIndex: -1,
                mixBlendMode: "screen",
                willChange: "background, box-shadow",
              }}
            />
          </motion.div>
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
