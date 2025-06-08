import React from "react";

const Introduction = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Changed from flex-end to space-between
        alignItems: "center",
        height: "100%",
        paddingBottom: "50px", // Added explicit padding that you can control
        boxSizing: "border-box", // Ensures padding is included in height calculation
      }}
    >
      {/* Your information */}
      <div style={{ marginTop: "auto" }}>
        {/* <p style={{ margin: 0 }}>Some information about me</p> */}
      </div>

      {/* Your name at the bottom */}
      <h1
        style={{
          margin: 0,
          padding: 0,
          // paddingLeft: "0.2rem",
          // paddingRight: "0.2rem",
          fontSize: "15rem",
          lineHeight: "0.9", // Tightens line height to reduce extra space
        }}
      >
        Parth Chawla
      </h1>
    </div>
  );
};

export default Introduction;
