import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, remove } from "firebase/database";
import { db } from "../firebase-config";

// Components
import MainIssues from "../components/MainIssues";
import DeviceCard from "../components/DeviceCard";
import { Link } from "react-router-dom";

// Assets
import progressRing from "/src/assets/icons/progressRing.svg";
import backArrow from "/src/assets/icons/backArrow.svg";

// Styles
import "../styles.css";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  const handleUpdateClick = () => {
    navigate(`/posts/${id}/update`);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await remove(ref(db, `posts/${id}`));
      alert("Post deleted successfully!");
      navigate("/explore"); // Navigate to /explore after delete
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const mockSession = {
      id: 1,
      creator: "John Smith",
      users: [
        {
          name: "Bjørn Hansen",
          role: "Trainee at RelyOn",
          avatar: "https://images.unsplash.com/photo-1686491730811-df4581911c55?q=80&w=3087&auto=format&fit=crop"
        },
        {
          name: "Henrik Madsen",
          role: "Trainee at Kanda",
          avatar: "https://images.unsplash.com/photo-1576110598658-096ae24cdb97?q=80&w=3087&auto=format&fit=crop"
        },
        {
          name: "Lars Kristensen",
          role: "Trainee at Winda",
          avatar: "https://images.unsplash.com/photo-1533973427779-4b8c2eb4c3cd?q=80&w=2940&auto=format&fit=crop"
        }
      ]
    };

    setSession(mockSession);
  }, [id]);

  if (!session) return <div className="loading">Loading...</div>;

  const iconMapping = {
    "XP Earned": "/src/assets/icons/xp.svg",
    "Safety": "/src/assets/icons/safetyIcon.svg",
    "Theory": "/src/assets/icons/theoryIcon.svg",
    "Identification": "/src/assets/icons/identificationIcon.svg",
    "Procedures": "/src/assets/icons/proceduresIcon.svg",
    "Troubleshooting": "/src/assets/icons/troubleshootingIcon.svg"
  };

  const progressData = [
    { title: "XP Earned", subtitle: "Points are gained by completing sessions and learning modules.", value: "145 XP", percent: "20%" },
    { title: "Safety", subtitle: "Introduction to safety protocols and risk prevention inside wind turbines.", value: "3 min", percent: "10%" },
    { title: "Theory", subtitle: "Core concepts of electrical flow, and circuit behavior in turbine systems.", value: "6 min", percent: "20%" },
    { title: "Identification", subtitle: "Learn how to recognize hazards and faulty components.", value: "1 min", percent: "5%" },
    { title: "Procedures", subtitle: "Step-by-step walkthrough of emergency procedures.", value: "12 min", percent: "40%" },
    { title: "Troubleshooting", subtitle: "Diagnosing and resolving electrical issues in turbine environments.", value: "0 min", percent: "0%" }
  ];

  return (
    <div className="analytics-page slide-in">
      <header className="top-bar">
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">GWO BTT Hydraulic</h1>
        <div className="icon-wrapper">
          <img src="/src/assets/icons/shareIcon.svg" alt="Share" className="header-icon" />
          <img
            src="/src/assets/icons/deleteIcon.svg"
            alt="Delete"
            className="header-icon"
            onClick={handleDeleteClick}
          />
        </div>
      </header>

      <section className="score-section">
        <div className="score-ring-wrapper">
          <img src={progressRing} alt="Progress Ring" className="progress-ring-bg" />
          <div className="score-ring-content">
            <p>23 min</p>
            <span>15%</span>
          </div>
        </div>
      </section>

      <div className="created-info">
        <p className="created-by">Created by</p>
        <h1 className="creator-name">{session.creator || "John Smith"}</h1>
        <small className="created-date">25/07/2025</small>
      </div>

      <section className="action-buttons">
        <button className="update-button" onClick={handleUpdateClick}>Update</button>
      </section>

      <section className="overview-section">
        <div className="overview-card">
          <h4 className="overview-value">2</h4>
          <p className="overview-label">Mistakes</p>
        </div>
        <div className="overview-card">
          <h4 className="overview-value">4</h4>
          <p className="overview-label">Rewards</p>
        </div>
        <div className="overview-card">
          <h4 className="overview-value">{session.users?.length || 0}</h4>
          <p className="overview-label">Users</p>
        </div>
      </section>

      <DeviceCard />

      <section className="current-progress">
        <h3>Current Progress</h3>
        <ul className="progress-list">
          {progressData.map((item, index) => (
            <li className="progress-item" key={index}>
              <img
                src={iconMapping[item.title]}
                className="progress-icon"
                alt={item.title}
              />
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

      <section className="users-section">
        <div className="section-header">
          <div className="users-header">
            <h3 className="users-text">Users</h3>
            <Link to="/users" className="view-all-text-users">View all &gt;</Link>
          </div>
        </div>
        <div className="user-list">
          {session.users?.slice(0, 3).map((user, index) => (
            <div className="chat-item" key={index}>
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="chat-avatar"
              />
              <div className="chat-info">
                <div className="chat-name">{user.name}</div>
                <div className="chat-message">{user.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MainIssues />
    </div>
  );
};

export default PostDetailPage;
