import { useNavigate } from "react-router-dom";
import "/src/styles.css";
import logo from "/src/assets/kanda.svg";
import { auth } from "../firebase-config";

// SVG Icon imports
import boltIcon from "/src/assets/icons/bolt.svg";
import electricalIcon from "/src/assets/icons/electrical.svg";
import hydraulicIcon from "/src/assets/icons/hydraulic.svg";
import mechanicalIcon from "/src/assets/icons/mechanical.svg";
import liftIcon from "/src/assets/icons/lift.svg";
import slingerIcon from "/src/assets/icons/slinger.svg";
import offshoreIcon from "/src/assets/icons/offshore.svg";
import defaultAvatar from "/src/assets/icons/userAvatar.svg";

// Sample course data
const lastOpenedCourses = [
  { title: "GWO BTT Hydraulic", duration: "1.30 h", sessions: 22, icon: hydraulicIcon, progress: 40 },
  { title: "GWO BTT Electrical", duration: "1.15 h", sessions: 12, icon: electricalIcon, progress: 60 },
];

const allCourses = [
  { title: "GWO BTT Bolt Tightening", duration: "2.45 h", sessions: 376, icon: boltIcon },
  { title: "GWO BTT Electrical", duration: "1.45 h", sessions: 512, icon: electricalIcon },
  { title: "GWO BTT Hydraulic", duration: "1.15 h", sessions: 613, icon: hydraulicIcon },
  { title: "GWO BTT Mechanical", duration: "2.00 h", sessions: 256, icon: mechanicalIcon },
  { title: "GWO Service Lift User", duration: "1.45 h", sessions: 123, icon: liftIcon },
  { title: "GWO Slinger Signaller", duration: "1.25 h", sessions: 765, icon: slingerIcon },
  { title: "Onboarding to Offshore", duration: "3.00 h", sessions: 156, icon: offshoreIcon },
];

export default function HomePage() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  const CourseCard = ({ course }) => {
    const handleClick = () => {
      navigate("/explore"); // Navigates to RidesPage.jsx
    };

    return (
      <div className="course-card" onClick={handleClick}>
        <div className="course-duration">{course.duration}</div>
        <img src={course.icon} alt="Course Icon" className="course-image" />
        <div className="course-title">{course.title}</div>
        <div className="course-sessions">{course.sessions} Sessions</div>
        {course.progress !== undefined && (
          <div className="course-progress-bar">
            <div
              className="course-progress-bar-fill"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="page">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-content">
          <div className="logo-container">
            <img src={logo} alt="Kanda Logo" className="logo" />
          </div>
        </div>
      </header>

      {/* Greeting */}
      <div className="greeting">
        <h2>Good Morning</h2>
        <h1>Welcome, John!</h1>
      </div>

      {/* Last Opened Courses */}
      <div className="section">
        <h3>Last Opened Courses</h3>
        <div className="horizontal-scroll">
          {lastOpenedCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>

      {/* All Courses */}
      <div className="section">
        <h3>All Courses</h3>
        <div className="grid-courses">
          {allCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
