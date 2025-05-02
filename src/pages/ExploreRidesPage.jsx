import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase-config";

import ProgressSection from "../components/ProgressSection";
import LeaderboardSection from "../components/LeaderboardSection";
import PostCard from "../components/PostCard";
import DeviceCard from "../components/DeviceCard";
import MainIssues from "../components/MainIssues";

import progressRing from "/src/assets/icons/progressRing.svg";
import backArrow from "/src/assets/icons/backArrow.svg";
import calendarIcon from "/src/assets/icons/calendar.svg";
import usersIcon from "/src/assets/icons/users.svg";
import { Link } from "react-router-dom";

import "../styles.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("your");
  const [isSliding, setIsSliding] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    setIsSliding(true);
    setTimeout(() => navigate(-1), 500);
  };

  useEffect(() => {
    setIsSliding(false);
  }, []);

  useEffect(() => {
    const postsRef = ref(db, "posts");

    console.log("📡 Subscribing to Firebase at path: 'posts'");

    const unsubscribe = onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("✅ Data received from Firebase:", data);

        const postArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        console.log("📦 Parsed postArray:", postArray);
        setPosts(postArray);
      } else {
        console.warn("⚠️ No posts found in Firebase.");
        setPosts([]);
      }

      setLoading(false);
    });

    return () => {
      console.log("🧹 Unsubscribing from Firebase.");
      unsubscribe();
    };
  }, []);

  const progressData = [
    { title: "XP Earned", subtitle: "Points are gained by completing sessions and learning modules.", value: "345 XP", percent: "40%" },
    { title: "Safety", subtitle: "Introduction to safety protocols and risk prevention inside wind turbines.", value: "8 min", percent: "20%" },
    { title: "Theory", subtitle: "Core concepts of electrical flow, and circuit behavior in turbine systems.", value: "15 min", percent: "60%" },
    { title: "Identification", subtitle: "Learn how to recognize hazards and faulty components.", value: "1 min", percent: "5%" },
    { title: "Procedures", subtitle: "Step-by-step walkthrough of emergency procedures.", value: "12 min", percent: "55%" },
    { title: "Troubleshooting", subtitle: "Diagnosing and resolving electrical issues in turbine environments.", value: "8 min", percent: "30%" },
  ];

  const iconMapping = {
    "XP Earned": "/src/assets/icons/xp.svg",
    "Safety": "/src/assets/icons/safetyIcon.svg",
    "Theory": "/src/assets/icons/theoryIcon.svg",
    "Identification": "/src/assets/icons/identificationIcon.svg",
    "Procedures": "/src/assets/icons/proceduresIcon.svg",
    "Troubleshooting": "/src/assets/icons/troubleshootingIcon.svg",
  };

  return (
    <div className={`analytics-page ${isSliding ? "slide-out" : "slide-in"}`}>
      <header className="top-bar">
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">GWO BTT Hydraulic</h1>
        <div className="icon-wrapper">
          <img src={calendarIcon} alt="Calendar" className="calendar-icon" />
          {activeTab === "all" && (
            <Link to="/users">
              <img src={usersIcon} alt="Users Icon" className="users-icon" />
            </Link>
          )}
        </div>
      </header>

      <div className="tab-switch">
        <button className={activeTab === "your" ? "active" : ""} onClick={() => setActiveTab("your")}>
          Your
        </button>
        <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
          All
        </button>
      </div>

      <section className="score-section">
        <div className="score-ring-wrapper">
          <img src={progressRing} alt="Progress Ring" className="progress-ring-bg" />
          <div className="score-ring-content">
            <p className={activeTab === "your" ? "your-tab-text" : "all-tab-text"}>
              {activeTab === "your" ? "48 min" : "117 h"}
            </p>
            <span className={activeTab === "your" ? "your-tab-info" : "all-tab-info"}>
              {activeTab === "your" ? "40 %" : "26 Users"}
            </span>
          </div>
        </div>
      </section>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {activeTab === "your" ? (
            <>
              <ProgressSection className="your-score" title="Your Score" sessions="22 Total Sessions" />
              <DeviceCard />
              <PostCard posts={posts} />
              <section className="current-progress">
                <h3 className="current-progress-h3">Current progress</h3>
                <ul className="progress-list">
                  {progressData.map((item, index) => (
                    <li className="progress-item" key={index}>
                      <img src={iconMapping[item.title]} className="progress-icon" alt={item.title} />
                      <div className="progress-text">
                        <div className="progress-header">
                          <span className="progress-title">{item.title}</span>
                          <span className="progress-value">{item.value}</span>
                        </div>
                        <p className="progress-subtitle">{item.subtitle}</p>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: item.percent }}></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <>
              <ProgressSection className="all-score" title="General Score" sessions="122 Total Sessions" />
              <LeaderboardSection />
              <PostCard posts={posts} />
     
              <MainIssues />
              
            </>
          )}
        </>
      )}
    </div>
  );
}
