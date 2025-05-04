import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { ref, onValue } from "firebase/database";

import vrIcon from "../assets/icons/headset.png";
import backArrow from "/src/assets/icons/backArrow.svg";

const DevicesPage = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const devicesRef = ref(db, "devices");
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const devicesArray = Object.entries(data).map(([id, device]) => ({
          id,
          ...device,
        }));
        setDevices(devicesArray);
      } else {
        setDevices([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="scoped-devices">
      <header className="top-bar">
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">Device History</h1>
      </header>

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

      {filteredDevices.map((device) => (
        <div key={device.id} className="device-info">
          <img src={vrIcon} alt="VR Headset" />
          <div className="device-details">
            <p className={`status ${device.status.toLowerCase()}`}>
              <span
                className={`status-dot ${device.status.toLowerCase()}-dot`}
              ></span>
              {device.status}
            </p>
            <p className="headset-name">{device.name}</p>
          </div>
          <div className="device-date">{device.date}</div>
        </div>
      ))}
    </div>
  );
};

export default DevicesPage;
