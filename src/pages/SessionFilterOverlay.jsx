import React from "react";

const SessionFilterOverlay = ({ onClose }) => {
  return (
    <div className="filter-overlay">
      <div className="filter-content">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <h2>Filter Sessions</h2>

        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="e.g. Mark Smith" />
        </div>

        <div className="form-group">
          <label>Role</label>
          <div className="toggle-group">
            <button className="active">Instructor</button>
            <button>Trainee</button>
          </div>
        </div>

        <div className="form-group">
          <label>Time spent</label>
          <input type="text" placeholder="e.g. 30 min" />
        </div>

        <div className="form-group">
          <label>Performance</label>
          <input type="text" placeholder="Best performance" />
        </div>

        <div className="form-group">
          <label>Course</label>
          <div className="tag-select">
            <button className="selected">Bolt Tightening</button>
            <button>BTT Electrical</button>
            <button>BTT Hydraulic</button>
            <button className="selected">BTT Mechanical</button>
            <button>Service Lift User</button>
            <button>Slinger Signaller</button>
          </div>
        </div>

        <button className="save-button">Save</button>
      </div>
    </div>
  );
};

export default SessionFilterOverlay;
