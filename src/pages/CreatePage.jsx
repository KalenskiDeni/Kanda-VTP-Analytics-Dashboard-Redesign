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

    // Validation checks
    if (!courseName || !sessionName || !description) {
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

    console.log("Creating post with data:", newPost); // Log post data before adding it to Firebase

    try {
      const postsRef = ref(database, "posts"); // Changed to "posts" node
      const postKey = await push(postsRef, newPost); // Push new post to the 'posts' node
      console.log("Post created with key:", postKey.key); // Log the generated key for debugging
      alert("Post created!");
      navigate("/"); // Navigate back to the homepage after creation
    } catch (err) {
      console.error("Post creation failed:", err); // Log error message
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
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
      />
      <textarea
        placeholder="Additional Info"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        className="form-textarea"
      />
      <button type="submit" className="submit-button">Create Post</button>
    </form>
  );
};

export default CreatePostPage;
