import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase-config";
import { ref, push } from "firebase/database";

const CreatePostPage = () => {
  const [courseName, setCourseName] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!courseName || !sessionName) {
      alert("Please fill in all fields.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const newPost = {
      courseName,
      sessionName,
      description,
      additionalInfo,
      creator: user.displayName || "Anonymous",
      creatorId: user.uid,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    try {
      const postsRef = ref(database, "posts");
      const postKey = await push(postsRef, newPost);
      alert("Post created!");
      navigate("/"); 
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("Something went wrong while creating the post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="form-input"
      />
      <input
        placeholder="Session Name"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        className="form-input"
      />

      <button type="submit" className="submit-button">
        Create Post
      </button>
    </form>
  );
};

export default CreatePostPage;
