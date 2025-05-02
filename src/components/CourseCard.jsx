import React from "react";
import "../styles.css";

const CourseCard = ({ course }) => (
  <div className="course-card">
    <div className="course-duration">{course.duration}</div>
    <img src={course.icon} alt="Course Icon" className="course-image" />
    <div className="course-title">{course.title}</div>
    <div className="course-sessions">{course.sessions} Sessions</div>
    {course.progress && (
      <div className="course-progress-bar">
        <div
          className="course-progress-bar-fill"
          style={{ width: `${course.progress}%` }}
        />
      </div>
    )}
  </div>
);

export default CourseCard;
