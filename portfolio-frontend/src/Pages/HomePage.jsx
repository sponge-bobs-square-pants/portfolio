import React from "react";
import LoadingAnimation from "../Components/LoadingAnimation";

const HomePage = () => {
  return (
    <div
      style={{
        margin: "0px",
        padding: "0px",
        background: "#FEFFFC",
        width: "100dvw",
        height: "100dvh",
      }}
    >
      HomePage
      <LoadingAnimation />
    </div>
  );
};

export default HomePage;
