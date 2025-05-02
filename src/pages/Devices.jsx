import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import vrIcon from "../assets/icons/headset.png";
import backArrow from "/src/assets/icons/backArrow.svg";

const devicesData = [
  { name: "Meta Quest QW7", status: "Disconnected" },
  { name: "Meta Quest X10", status: "Disconnected" },
  { name: "Meta Quest Pro", status: "Disconnected" },
  { name: "Meta Quest Elite", status: "Active" },
  { name: "Meta Quest Mini", status: "Active" },
];

const Devices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const filteredDevices = devicesData.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="devices-page">
      <header className="top-bar">
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">Device History</h1>
      </header>

      {/* Search + Filter */}
      <div className="search-filter-row">
        <input
          type="text"
          placeholder="Search devices..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Disconnected">Disconnected</option>
        </select>
      </div>

      {filteredDevices.map((device, index) => (
        <div key={index}>
          <div className="device-info">
            <img src={vrIcon} alt="VR Headset" />
            <div>
              <p className={`status ${device.status.toLowerCase()}`}>
                <span className={`status-dot ${device.status.toLowerCase()}-dot`}></span>
                {device.status}
              </p>
              <p className="headset-name">{device.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Devices;
