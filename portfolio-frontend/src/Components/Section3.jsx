import React, { useState } from "react";

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
    },
    {
      id: 2,
      title: "Company(NDA)",
      subtitle: "",
      date: "Jan",
      day: "01",
      year: "2021",
      type: "work",
      description: "Worked as a Web Scraping Developer for 6 months",
      color: "#4a90e2",
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
    },
  ];

  return (
    <div className="w-full min-h-screen bg-transparent p-8 flex flex-col items-center justify-center">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          My Journey Timeline
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="w-full max-w-7xl overflow-x-auto py-8">
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
            const leftPosition = index * 350 + 175;
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
            const leftPosition = index * 350 + 175;

            return (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: `${leftPosition}px`,
                  top: "0",
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
                    top: isAbove ? "80px" : "auto",
                    bottom: isAbove ? "auto" : "80px",
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
                    <div className="flex-none w-20 flex flex-col items-center justify-center text-center pr-4 border-r border-gray-100">
                      <div className="text-xs text-gray-500 font-medium leading-tight mb-1">
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

                      {/* Row 2 - Images */}
                      <div className="flex gap-2 mt-auto">
                        <div
                          className="w-10 h-10 rounded-md flex items-center justify-center text-white text-xs font-semibold"
                          style={{
                            background: `linear-gradient(45deg, ${event.color}, ${event.color}80)`,
                          }}
                        >
                          IMG
                        </div>
                        <div
                          className="w-10 h-10 rounded-md flex items-center justify-center text-white text-xs font-semibold"
                          style={{
                            background: `linear-gradient(135deg, ${event.color}60, ${event.color}40)`,
                          }}
                        >
                          IMG
                        </div>
                        <div
                          className="w-10 h-10 rounded-md flex items-center justify-center text-white text-xs font-semibold"
                          style={{
                            background: `linear-gradient(225deg, ${event.color}40, ${event.color}20)`,
                          }}
                        >
                          IMG
                        </div>
                      </div>
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
    </div>
  );
};

export default Section3;
