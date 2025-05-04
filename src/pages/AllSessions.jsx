import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionFilterOverlay from "./SessionFilterOverlay";
import backArrow from "/src/assets/icons/backArrow.svg";
import clockIcon from "/src/assets/icons/clock.svg";


const allSessions = [
  {
    id: 1,
    title: "Demo Slinger Signaller",
    creator: "John Smith",
    date: "30/04/2025",
    duration: "1.30 h",
    status: "Active",
    icon: "/src/assets/icons/slinger.svg",
    course: "Slinger Signaller",
  },
  {
    id: 2,
    title: "Demo BTT Electrical",
    creator: "John Smith",
    date: "30/04/2025",
    duration: "1.15 h",
    status: "Active",
    icon: "/src/assets/icons/electrical.svg",
    course: "BTT Electrical",
  },
  {
    id: 3,
    title: "Test Service Lift User",
    creator: "John Smith",
    date: "26/04/2025",
    duration: "2.30 h",
    status: "Completed",
    icon: "/src/assets/icons/service-lift.svg",
    course: "Service Lift User",
  },
  {
    id: 4,
    title: "Demo OTO",
    creator: "Jane Doe",
    date: "22/04/2025",
    duration: "1.35 h",
    status: "Active",
    icon: "/src/assets/icons/oto.svg",
    course: "BTT Mechanical",
  },
  {
    id: 5,
    title: "Test BTT Hydraulic",
    creator: "John Smith",
    date: "20/04/2025",
    duration: "1.40 h",
    status: "Completed",
    icon: "/src/assets/icons/hydraulic.svg",
    course: "BTT Hydraulic",
  },
  {
    id: 6,
    title: "Demo BTT Electrical",
    creator: "Jane Doe",
    date: "17/04/2025",
    duration: "1.10 h",
    status: "Active",
    icon: "/src/assets/icons/electrical.svg",
    course: "BTT Electrical",
  },
];


const userName = "John Smith";

const AllSessions = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("yours"); // active tab state
  const [searchTerm, setSearchTerm] = useState(""); // search term state
  const [filterCourse, setFilterCourse] = useState("All"); // filter dropdown state for courses

  const handleBackButtonClick = () => navigate(-1);

  const handleSessionClick = (sessionId) => {
    navigate(`/session/${sessionId}`); // navigate to Session Details
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab); // switch between "Yours" and "All"
  };

  // filter sessions based on the active tab, search term, and filter course
  const filteredSessions = allSessions
    .filter((session) => {
      if (activeTab === "yours" && session.creator !== userName) {
        return false; 
      }
      return true; 
    })
    .filter((session) => {
      if (searchTerm) {
        return session.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true; 
    })
    .filter((session) => {
      if (filterCourse !== "All") {
        return session.course === filterCourse;
      }
      return true; 
    });

  return (
    <div className="all-sessions-page">
      <header className="top-bar">
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">Sessions</h1>
      </header>

      <div className="search-filter-row">
        <input
          type="text"
          placeholder="Search sessions..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-dropdown"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Slinger Signaller">Slinger Signaller</option>
          <option value="BTT Electrical">BTT Electrical</option>
          <option value="BTT Hydraulic">BTT Hydraulic</option>
          <option value="BTT Mechanical">BTT Mechanical</option>
          <option value="Service Lift User">Service Lift User</option>
          <option value="Bolt Tightening">Bolt Tightening</option>
        </select>
      </div>

      <div className="tab-switch">
        <button
          className={activeTab === "yours" ? "active" : ""}
          onClick={() => handleTabSwitch("yours")}
        >
          Your
        </button>
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => handleTabSwitch("all")}
        >
          All
        </button>
      </div>

      <div className="sessions-list">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="session-card"
            onClick={() => handleSessionClick(session.id)}
          >
            <img
              src={session.icon}
              alt="Session Icon"
              className="session-icon"
            />
            <div className="session-info">
              <p className="session-title">{session.title}</p>
              <p className="session-creator">{session.creator}</p>
              <p className="session-date">{session.date}</p>
            </div>
            <div className="session-duration">
              <img src={clockIcon} alt="Clock" className="clock-icon" />
              <span>{session.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {showFilter && (
        <SessionFilterOverlay onClose={() => setShowFilter(false)} />
      )}
    </div>
  );
};

export default AllSessions;
