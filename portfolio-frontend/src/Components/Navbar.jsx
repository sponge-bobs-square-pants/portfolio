import React, { useState, useEffect, useRef } from "react";

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

// Enhanced NavButton without individual background
const NavButton = ({ children, onClick, isActive, sectionId }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      id={`nav-${sectionId}`}
      style={{
        background: "none", // No individual background
        border: "none",
        color: isActive ? "#F4D205" : hover ? "white" : "#808181",
        cursor: "pointer",
        fontSize: "1.25rem",
        margin: "1px",
        padding: "19px 14px",
        borderRadius: "1.5rem",
        transition: "color 0.3s ease", // Only animate color now
        height: "calc(100% - 16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2, // Above the sliding background
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        onClick(sectionId);
        scrollToSection(sectionId);
      }}
    >
      {children}
    </button>
  );
};

const Navbar = ({ activeSection, onNavClick }) => {
  const navRef = useRef(null);
  const [highlightStyle, setHighlightStyle] = useState({});

  const sections = ["section1", "section2", "section3", "section4"];

  // Update highlight position when activeSection changes
  useEffect(() => {
    const updateHighlight = () => {
      if (!navRef.current) return;

      const activeButton = document.getElementById(`nav-${activeSection}`);
      if (!activeButton) return;

      const navRect = navRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const left = buttonRect.left - navRect.left;
      const width = buttonRect.width;

      setHighlightStyle({
        left: `${left}px`,
        width: `${width}px`,
        opacity: 1,
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateHighlight, 10);

    // Also update on window resize
    window.addEventListener("resize", updateHighlight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateHighlight);
    };
  }, [activeSection]);

  const handleNavClick = (sectionId) => {
    onNavClick(sectionId);
  };

  return (
    <nav
      ref={navRef}
      style={{
        background: "black",
        borderRadius: "2rem",
        height: "47px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "auto",
        padding: "0 4px",
        position: "relative", // For absolute positioning of highlight
      }}
    >
      {/* Sliding highlight background */}
      <div
        style={{
          position: "absolute",
          top: "4px", // Adjust to match button margins
          height: "calc(100% - 8px)", // Match button height
          background: "#4C410A",
          borderRadius: "1.5rem",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth easing
          zIndex: 1,
          opacity: 0,
          ...highlightStyle,
        }}
      />

      <NavButton
        onClick={handleNavClick}
        isActive={activeSection === "section1"}
        sectionId="section1"
      >
        Hey
      </NavButton>
      <NavButton
        onClick={handleNavClick}
        isActive={activeSection === "section2"}
        sectionId="section2"
      >
        Work
      </NavButton>
      <NavButton
        onClick={handleNavClick}
        isActive={activeSection === "section3"}
        sectionId="section3"
      >
        Story
      </NavButton>
      <NavButton
        onClick={handleNavClick}
        isActive={activeSection === "section4"}
        sectionId="section4"
      >
        Chat
      </NavButton>
    </nav>
  );
};

export default Navbar;
