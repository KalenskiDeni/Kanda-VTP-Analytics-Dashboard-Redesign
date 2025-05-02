import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/styles.css";
import backArrow from "/src/assets/icons/backArrow.svg";
import { auth } from "../firebase-config";

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://kanda-vtp-analytics-dashboard-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        );
        const data = await response.json();
        console.log("Fetched users raw data:", data);

        // Convert object with numeric keys into array
        if (data && typeof data === "object") {
          setUsers(Object.values(data));
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="chat-page">
      <header className="top-bar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src={backArrow} alt="Go back" />
        </button>
        <h1 className="page-title">All Members</h1>
      </header>

      <div className="weird-text-messages">
        <h1>Messages</h1>
      </div>

      <div className="search-bar-chat">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="chat-list">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="chat-item">
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="chat-avatar"
              />
              <div className="chat-info">
                <div className="chat-name">{user.name}</div>
                <div className="chat-message">{user.message}</div>
              </div>
              <div className="chat-meta">
                {user.time && <span className="chat-time">{user.time}</span>}
                {user.unread && <span className="unread-badge">1</span>}
              </div>
            </div>
          ))
        ) : (
          <div>No users available</div>
        )}
      </div>
    </section>
  );
}
