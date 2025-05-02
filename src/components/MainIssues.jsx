import React from "react";
import { Link } from "react-router-dom";
import maintenanceIcon from "/src/assets/icons/maintenance.svg";
import identifyingIcon from "/src/assets/icons/identifying.svg";
import handlingIcon from "/src/assets/icons/handling.svg";
import proceduresIcon from "/src/assets/icons/procedures.svg";
import theoryIcon from "/src/assets/icons/theory.svg";

const issues = [
  { icon: maintenanceIcon, title: "Maintenance", desc: "Proper techniques for turbine electrical systems to ensure safety.", users: 26 },
  { icon: identifyingIcon, title: "Identifying", desc: "Spotting and categorizing electrical risks before they become critical.", users: 19 },
  { icon: handlingIcon, title: "Handling", desc: "Safe interaction with electrical tools inside turbine environments.", users: 7 },
  { icon: proceduresIcon, title: "Procedures", desc: "Detailed guide on executing safe electrical operations.", users: 34 },
  { icon: theoryIcon, title: "Theory", desc: "Foundational knowledge of electrical systems in wind turbines.", users: 17 },
];

const MainIssues = () => {
  return (
    <section className="main-issues">
      <div className="issues-header">
        <h3>Main Issues</h3>
        <Link to="/mainissues" className="view-all-link">View all &gt;</Link>
      </div>

      {issues.map((issue, index) => (
        <div key={index} className="issue-item">
          <div className="issue-left">
            <img src={issue.icon} alt={`${issue.title} icon`} className="issue-icon" />
            <div className="issue-text">
              <p className="issue-title">{issue.title}</p>
              <p className="issue-desc">{issue.desc}</p>
            </div>
          </div>
          <div className="issue-users">{issue.users} users</div>
        </div>
      ))}
    </section>
  );
};

export default MainIssues;
