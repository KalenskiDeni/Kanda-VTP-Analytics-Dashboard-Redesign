import React from "react";
import { Link } from "react-router-dom";
import user1 from "../assets/icons/matias.svg";
import user2 from "../assets/icons/bjørn.svg";
import user3 from "../assets/icons/henrik.svg";
import leaderboardArrow from "../assets/icons/LeaderboardArrow.svg";

const users = [
  { name: "Matias Jensen", points: "1,398 XP", position: 1, img: user1 },
  { name: "Bjorn Hansen", points: "1,092 XP", position: 2, img: user2 },
  { name: "Henrik Madsen", points: "954 XP", position: 3, img: user3 },
];

const LeaderboardSection = () => {
  return (
    <section className="leaderboard-wrapper">
      {/* Header OUTSIDE the card */}
      <div className="leaderboard-header">
        <h3 className="current-progress-h3">Leaderboard</h3>
        <Link to="/leaderboard" className="view-all-text">
          View all &gt;
        </Link>
      </div>

      {/* Card containing the leaderboard items */}
      <div className="leaderboard-card">
        {users.map((user, i) => (
          <div key={i} className="leaderboard-item">
            <img src={user.img} alt={user.name} />
            <div>
              <p>{user.name}</p>
              <small>{user.points}</small>
            </div>

            <div className="position-with-icon">
              <span>{user.position}</span>
              <img
                src={leaderboardArrow}
                alt="Position Icon"
                className="position-icon"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeaderboardSection;
