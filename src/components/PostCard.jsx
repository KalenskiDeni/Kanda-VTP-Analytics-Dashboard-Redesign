import React from "react";
import { useNavigate } from "react-router-dom";
import liftIcon from "../assets/icons/lift.svg"; // Default icon

const PostCard = ({ posts }) => {
  const navigate = useNavigate();

  // If no posts or an empty array is passed, show a message
  if (!posts || posts.length === 0) {
    return <p>No posts available</p>;
  }

  return (
    <section className="recent-sessions">
      <div className="section-header">
        <h3>Recent Sessions</h3>
        <span
          className="view-all-text"
          onClick={() => navigate("/all-sessions")}
        >
          View all &gt;
        </span>
      </div>

      <div className="horizontal-scroll">
        {posts.map((post) => (
          <div
            key={post.id}
            className="session-card"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div className="duration">{post.duration}</div>
            <img
              src={post.icon || liftIcon} // Fallback to default icon if none is provided
              alt="session icon"
              className="icon"
            />
            <div>
              <p className="session-title">{post.title}</p>
              <p className="post-creator">{post.creator}</p>
              <p className="post-date">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostCard;
