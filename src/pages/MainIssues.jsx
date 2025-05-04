import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import maintenanceIcon from "/src/assets/icons/maintenance.svg";
import identifyingIcon from "/src/assets/icons/identifying.svg";
import handlingIcon from "/src/assets/icons/handling.svg";
import proceduresIcon from "/src/assets/icons/procedures.svg";
import theoryIcon from "/src/assets/icons/theory.svg";
import backArrow from "/src/assets/icons/backArrow.svg";

const issuesData = [
  {
    icon: maintenanceIcon,
    title: "Maintenance",
    desc: "Proper techniques for turbine electrical systems to ensure safety.",
    users: 26,
  },
  {
    icon: identifyingIcon,
    title: "Identifying",
    desc: "Spotting and categorizing electrical risks before they become critical.",
    users: 19,
  },
  {
    icon: handlingIcon,
    title: "Handling",
    desc: "Safe interaction with electrical tools inside turbine environments.",
    users: 7,
  },
  {
    icon: proceduresIcon,
    title: "Procedures",
    desc: "Detailed guide on executing safe electrical operations.",
    users: 34,
  },
  {
    icon: theoryIcon,
    title: "Theory",
    desc: "Foundational knowledge of electrical systems in wind turbines.",
    users: 17,
  },
];

const MainIssues = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const filteredIssues = issuesData.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-issues-page">
      {/* Top bar */}
      <header className="top-bar">
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">Main Issues</h1>
      </header>

      {/* Search bar */}
      <div className="search-filter-row">
        <input
          type="text"
          placeholder="Search issues..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      
      </div>

      {/* List of issues */}
      <div className="issues-list">
        {filteredIssues.map((issue, index) => (
          <div key={index} className="issue-item">
            <div className="issue-left">
              <img
                src={issue.icon}
                alt={`${issue.title} icon`}
                className="issue-icon"
              />
              <div className="issue-text">
                <p className="issue-title">{issue.title}</p>
                <p className="issue-desc">{issue.desc}</p>
              </div>
            </div>
            <div className="issue-users">{issue.users} users</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainIssues;
