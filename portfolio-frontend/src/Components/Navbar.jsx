import React, { useState } from "react";

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

// Enhanced NavButton with smooth transition and active state
const NavButton = ({ children, onClick, isActive, sectionId }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      id={`nav-${sectionId}`}
      style={{
        background: isActive ? "#4C410A" : "none", // Yellow background for active state
        border: "none",
        color: isActive ? "#F4D205" : hover ? "white" : "#808181",
        cursor: "pointer",
        fontSize: "1.25rem",
        margin: "1px", // Add margin to keep highlighted tabs within navbar
        padding: "19px 14px",
        borderRadius: "1.5rem", // Rounded corners
        transition: "all 0.3s ease", // Smooth transition for all changes
        height: "calc(100% - 16px)", // Full height minus margins
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

const Navbar = () => {
  // State to track the active section
  const [activeSection, setActiveSection] = useState("section1"); // Default to first section

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <nav
      style={{
        background: "black",
        borderRadius: "2rem",
        height: "47px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around", // Space buttons evenly
        width: "auto", // Auto width based on content
        padding: "0 4px", // Small padding on the edges
      }}
    >
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
        isActive={activeSection === "chat"}
        sectionId="chat"
      >
        Chat
      </NavButton>
    </nav>
  );
};

export default Navbar;
