import React from "react";
import { useNavigate } from "react-router-dom";
import user1 from "../assets/icons/matias.svg";
import user2 from "../assets/icons/bjørn.svg";
import user3 from "../assets/icons/henrik.svg";
import backArrow from "/src/assets/icons/backArrow.svg";

// Dummy data
const allUsers = Array.from({ length: 20 }, (_, i) => ({
  name: `User ${i + 1}`,
  points: `${Math.floor(Math.random() * 2000)} XP`,
  position: i + 1,
  img: [user1, user2, user3][i % 3],
}));

const LeaderboardPage = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => navigate(-1);

  return (
    <div className="leaderboard-page">
      <header className="top-bar">
        <button className="back-button" onClick={handleBackButtonClick}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">Leaderboard</h1>
      </header>



      <div className="leaderboard-list">
        {allUsers.map((user, i) => (
          <div key={i} className="leaderboard-item">
            <img src={user.img} alt={user.name} />
            <div>
              <p>{user.name}</p>
              <small>{user.points}</small>
            </div>
            <span>#{user.position}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
