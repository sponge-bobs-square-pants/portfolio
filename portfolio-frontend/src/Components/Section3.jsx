import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Paruluniersity from "../assets/paruluniversity.jpg";
import ITMO from "../assets/itmo.jpeg";
import wildberries from "../assets/wwildberries.jpeg";
import ItmoLogo from "../assets/itmo_logo.png";
import Alendei from "../assets/Alendei.png";
import GradScaler from "../assets/gradscaler.jpeg";

const Section3 = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const timelineEvents = [
    {
      id: 1,
      title: "B.Tech",
      subtitle: "",
      date: "May",
      day: "15",
      year: "2020",
      type: "personal",
      description:
        "I graduated from Parul University with a degree in Computer Science.",
      color: "#9b59b6",
      images: [Paruluniersity],
    },
    {
      id: 2,
      title: "NDA",
      subtitle: "",
      date: "Jan",
      day: "01",
      year: "2021",
      type: "work",
      description: "Worked as a Web Scraping Developer for 6 months",
      color: "#4a90e2",
      images: [],
    },
    {
      id: 3,
      title: "M.Tech",
      subtitle: "",
      date: "Sept",
      day: "22",
      year: "2022",
      type: "personal",
      description:
        "Graduated with a Master's in Information Security from ITMO University, Russia.",
      color: "#e91e63",
      images: [ITMO, ItmoLogo],
    },
    {
      id: 4,
      title: "Jr. Developer",
      subtitle: "",
      date: "Apr",
      day: "10",
      year: "2022",
      type: "work",
      description: "Worked as a Jr. Developer at wildberries, Russia.",
      color: "#e74c3c",
      images: [wildberries],
    },
    {
      id: 5,
      title: "M.Tech",
      subtitle: "",
      date: "Dec",
      day: "31",
      year: "2022",
      type: "personal",
      description:
        "Got a full scholarship for M.Tech in Web Development at ITMO University, Russia.",
      color: "#27ae60",
      images: [ITMO, ItmoLogo],
    },
    {
      id: 6,
      title: "API Integration specialist",
      subtitle: "",
      date: "Jan",
      day: "22",
      year: "2024",
      type: "work",
      description: "Worked as a MERN stack developer at Alendei Platforms.",
      color: "#27ae60",
      images: [Alendei],
    },
    {
      id: 7,
      title: "Md. Developer",
      subtitle: "",
      date: "Sept",
      day: "01",
      year: "2024",
      type: "work",
      description:
        "Started working as a MERN stack, AI/ML Developer at GradScaler.",
      color: "#f39c12",
      images: [],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-transparent p-8 flex flex-col items-center justify-center relative">
      {/* Timeline Container */}
      <div
        className="w-full overflow-x-auto py-8"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        <style jsx>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div.overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div
          style={{
            position: "relative",
            width: `${timelineEvents.length * 350}px`,
            height: "600px",
            margin: "0 auto",
          }}
        >
          {/* Horizontal Timeline Line - Behind dots */}
          <div
            className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 rounded-full transform -translate-y-1/2"
            style={{ zIndex: 1 }}
          />

          {/* Blue dots rendered separately to ensure they're on top */}
          {timelineEvents.map((event, index) => {
            const leftPosition = index * 350 + 195;
            return (
              <div
                key={`dot-${event.id}`}
                className="absolute top-1/2 w-4 h-4 rounded-full bg-black border-2 border-white transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${leftPosition}px`,
                  zIndex: 30,
                }}
              />
            );
          })}

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => {
            const isAbove = index % 2 === 0;
            const topPosition = isAbove
              ? event.images.length > 0
                ? "80px"
                : "140px"
              : "auto";
            const bottomPosition = isAbove
              ? "auto"
              : event.images.length > 0
              ? "80px"
              : "140px";

            const leftPosition = index * 350 + 175;

            return (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: `${leftPosition}px`,
                  top: "0",
                  marginLeft: "20px",
                  marginRight: "20px",
                  width: "350px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: "translateX(-50%)",
                }}
              >
                {/* Event Card Container with Arrow */}
                <div
                  style={{
                    position: "absolute",
                    top: topPosition,
                    bottom: bottomPosition,
                    width: "100%",
                    zIndex: 10,
                  }}
                >
                  {/* Event Card with Date Inside */}
                  <div
                    onClick={() => setSelectedEvent(event)}
                    style={{
                      background: "white",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      width: "100%",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      display: "flex",
                      gap: "1rem",
                      position: "relative",
                    }}
                  >
                    {/* Left Column - Date */}
                    <div className="flex-none w-20 flex flex-col items-center justify-center text-center pr-4 border-r border-gray-100 gap-1">
                      <div className="text-xs text-gray-500 font-medium leading-tight mb-1 ">
                        {event.date}
                      </div>
                      <div className="text-3xl text-gray-900 font-bold leading-none mb-1">
                        {event.day}
                      </div>
                      <div className="text-xs text-gray-500 font-medium leading-tight">
                        {event.year}
                      </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Row 1 - Info */}
                      <div>
                        <h3 className="text-lg text-gray-900 mb-2 font-semibold leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed m-0">
                          {event.subtitle}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Row 2 - Images (only display if images exist) */}
                      {event.images && event.images.length > 0 && (
                        <div className="flex gap-2 mt-auto">
                          {event.images.map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="w-16 h-10 rounded-md overflow-hidden flex items-center justify-center"
                              style={{
                                background:
                                  imgIndex === 0
                                    ? `linear-gradient(45deg, ${event.color}, ${event.color}80)`
                                    : imgIndex === 1
                                    ? `linear-gradient(135deg, ${event.color}60, ${event.color}40)`
                                    : `linear-gradient(225deg, ${event.color}40, ${event.color}20)`,
                              }}
                            >
                              <img
                                src={image}
                                alt={`${event.title} image ${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to colored placeholder if image fails to load
                                  e.target.style.display = "none";
                                  e.target.parentElement.innerHTML = `<span class="text-white text-xs font-semibold">IMG</span>`;
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow attached to the card */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%) rotate(180deg)",
                      top: isAbove ? "100%" : "-16px",
                      zIndex: 15,
                    }}
                  >
                    <div
                      style={{
                        width: "0",
                        height: "0",
                        borderLeft: "12px solid transparent",
                        borderRight: "12px solid transparent",
                        borderTop: isAbove ? "0" : "16px solid white",
                        borderBottom: isAbove ? "16px solid white" : "0",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Right Instruction - Fixed to Section3 bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-500">
        <span className="text-sm font-medium">SCROLL RIGHT FOR MORE</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Section3;
