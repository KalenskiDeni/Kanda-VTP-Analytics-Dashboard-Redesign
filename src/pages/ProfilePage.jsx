import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config"; // firebase authentication
import { updateProfile } from "firebase/auth"; // firebase function to update profile
import { useNavigate } from "react-router-dom";

import PostCard from "../components/PostCard";
import backButton from "../assets/icons/backButton.svg";

import "/src/styles.css"; 

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(
    auth.currentUser?.photoURL || "https://via.placeholder.com/150"
  );
  const [imageUrl, setImageUrl] = useState(profileImage);
  const [name, setName] = useState(
    auth.currentUser?.displayName || "Anonymous"
  );
  const [posts, setPosts] = useState([]); // for sessions/posts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      setProfileImage(
        auth.currentUser.photoURL || "https://via.placeholder.com/150"
      );
      setName(auth.currentUser.displayName || "Anonymous");
    }

    // fetch posts from Firebase
    fetch(
      "https://kanda-vtp-analytics-dashboard-default-rtdb.europe-west1.firebasedatabase.app/sessions.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const loadedPosts = [];
        const user = auth.currentUser;

        for (const key in data) {
          // only include posts created by this user
          if (data[key].facilitator?.name === user.displayName) {
            loadedPosts.push({
              id: key,
              ...data[key],
            });
          }
        }

        setPosts(loadedPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);

  const handleBack = () => navigate("/");

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, {
          displayName: name,
          photoURL: imageUrl,
        });
        console.log("Profile updated successfully");
        setProfileImage(imageUrl);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("An error occurred while updating your profile.");
      }
    }
  };

  return (
    <section id="profile-page" className="page">
      <img
        src={backButton}
        onClick={handleBack}
        alt="Back"
        className="backbutton-profile"
      />
      <p className="profile-textt">Your Profile</p>

      {/* profile Image */}
      <div className="profile-image-container">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <input
          type="text"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          className="image-url-input"
        />
      </div>

      {/* name */}
      <div className="profile-name">
        <label className="name-label" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="profile-name-inputtt"
        />
      </div>

      {/* additional profile info */}
      <div className="profile-info">
        <p>Email: {auth.currentUser?.email}</p>
        <p>Account Created: {auth.currentUser?.metadata.creationTime}</p>
      </div>

      {/* save button */}
      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>

      {/* recent sessions section */}
      <section className="recent-sessions">
        <div className="section-header">
          <h3>Your Recent Sessions</h3>
          <span
            className="view-all-text"
            onClick={() => navigate("/all-sessions")}
          >
            View all &gt;
          </span>
        </div>

        {/* posts */}
        {loading ? (
          <p>Loading sessions...</p>
        ) : posts.length > 0 ? (
          <PostCard posts={posts} />
        ) : (
          <p>No sessions found!</p>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
