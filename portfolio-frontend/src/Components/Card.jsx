import React from "react";
// import Image from "next/image";

const Card = ({ title, description, src, url, color, i }) => {
  return (
    <div className="cardContainer">
      <div
        className="card"
        style={{ backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }}
      >
        <h2>{title}</h2>
        <div className="body">
          <div className="description">
            <p>{description}</p>
            <span>
              <a href={url} target="_blank" rel="noopener noreferrer">
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <div className="imageContainer">
            <div className="inner">
              <image fill src={`/images/${src}`} alt="image" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardContainer {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0px;
        }
        .card {
          display: flex;
          flex-direction: column;
          position: relative;
          height: 500px;
          width: 1000px;
          border-radius: 25px;
          padding: 50px;
          transform-origin: top;
        }
        .card h2 {
          text-align: center;
          margin: 0px;
          font-size: 28px;
        }
        .body {
          display: flex;
          height: 100%;
          margin-top: 50px;
          gap: 50px;
        }
        .description {
          width: 40%;
          position: relative;
          top: 10%;
        }
        .description p {
          font-size: 16px;
        }
        .description p::first-letter {
          font-size: 28px;
          font-family: "Title";
        }
        .description span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .description a {
          font-size: 12px;
          text-decoration: underline;
          cursor: pointer;
        }
        .imageContainer {
          position: relative;
          width: 60%;
          height: 100%;
          border-radius: 25px;
          overflow: hidden;
        }
        .inner {
          width: 100%;
          height: 100%;
        }
        .imageContainer img {
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default Card;
