import React from "react";

const ProgressSection = ({ className, percentage, time, title, sessions, users }) => {
  return (
    <section className={`progress-section ${className}`}>
      <div className="circular-progress">
        <div className="circle">
          {percentage}
          <br />
          <small>{time}</small>
        </div>
      </div>
      <div className="score-details">
        <h2>{title}</h2>
        <p>{sessions}</p>
        {users && <p>{users}</p>}
      </div>
    </section>
  );
};

export default ProgressSection;
