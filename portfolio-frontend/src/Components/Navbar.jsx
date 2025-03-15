import React from "react";

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  return (
    <nav
      style={{
        background: "black",
        // marginTop: "6px",
        borderRadius: "2rem",
        width: "120%",
        margin: "0 auto", // center horizontally
        height: "50px", // fixed height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <button
        className="nav-btn" // define hover state in index.css
        style={{
          background: "none",
          border: "none",
          color: "lightgray",
          cursor: "pointer",
          fontSize: "1rem",
        }}
        onClick={() => scrollToSection("section1")}
      >
        Section 1
      </button>
      <button
        className="nav-btn"
        style={{
          background: "none",
          border: "none",
          color: "lightgray",
          cursor: "pointer",
          fontSize: "1rem",
        }}
        onClick={() => scrollToSection("section2")}
      >
        Section 2
      </button>
      <button
        className="nav-btn"
        style={{
          background: "none",
          border: "none",
          color: "lightgray",
          cursor: "pointer",
          fontSize: "1rem",
        }}
        onClick={() => scrollToSection("section3")}
      >
        Section 3
      </button>
    </nav>
  );
};

export default Navbar;
