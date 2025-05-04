import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles.css"; 
import backArrow from "/src/assets/icons/backArrow.svg"; 

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch leaderboard data from Firebase
    async function fetchLeaderboard() {
      try {
        // correct Firebase URL to fetch leaderboard data
        const response = await fetch(
          "https://kanda-vtp-analytics-dashboard-default-rtdb.europe-west1.firebasedatabase.app/leaderboard.json"
        );
        const data = await response.json();

        console.log("Fetched leaderboard data:", data);

        // check if the data contains the leaderboard and transform it into an array
        if (data) {
          // convert the object into an array for easy mapping
          setLeaderboard(Object.values(data));
        } else {
          setLeaderboard([]); // if no leaderboard data, set empty array
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLeaderboard([]); // If an error occurs, set empty array
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    }

    fetchLeaderboard();
  }, []); 

  if (loading) return <div>Loading...</div>;

  return (
    <section className="chat-page">
      <header className="top-bar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">Leaderboard</h1>
      </header>

      <div className="weird-text-messages">
        <h1>Leaderboard</h1>
      </div>

      <div className="search-bar-chat">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="chat-list">
        {leaderboard.length > 0 ? (
          leaderboard.map((user, index) => (
            <div key={user.position} className="chat-item">
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="chat-avatar"
              />
              <div className="chat-info">
                <div className="chat-name">{user.name}</div>
                <div className="chat-points">{user.points}</div>
              </div>
              <div className="chat-meta">
                <span className="chat-position">Position: {user.position}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No leaderboard data available</div>
        )}
      </div>
    </section>
  );
}
