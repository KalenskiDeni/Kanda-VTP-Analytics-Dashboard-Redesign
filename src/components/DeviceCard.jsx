import React from "react";
import { Link } from "react-router-dom";
import vrIcon from "../assets/icons/headset.png";

const DeviceCard = () => {
  return (
    <section className="device-section">
      <div className="device-header">
        <h3>Devices</h3>
        <Link to="/devices" className="view-all-text">View all &gt;</Link>
      </div>

      <div className="device-card">
        <div className="device-info">
          <img src={vrIcon} alt="VR Headset" />
          <div>
            <p className="status">
              <span className="status-dot"></span>
              Active
            </p>
            <p className="headset-name">Meta Quest QW7</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceCard;
