import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase-config";
import { ref, get, update } from "firebase/database";

const UpdaterPage = () => {
  const { id } = useParams(); // get the post ID from the URL
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    // fetch the post data when the component mounts
    const fetchPostData = async () => {
      try {
        const postRef = ref(database, "posts/" + id); // get the post from the database using the post ID
        const postSnapshot = await get(postRef);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.val();
          setCourseName(postData.courseName);
          setSessionName(postData.sessionName);
          setDescription(postData.description);
          setAdditionalInfo(postData.additionalInfo);
        } else {
          alert("Post not found!");
          navigate("/"); // redirect to homepage if the post doesn't exist
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
        alert("Error fetching post data.");
      }
    };

    fetchPostData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName || !sessionName || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const updatedPost = {
      courseName,
      sessionName,
      description,
      additionalInfo,
      creator: user.displayName || "Anonymous",
      creatorId: user.uid,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    console.log("Updating post with data:", updatedPost); // Log updated data before saving

    try {
      const postRef = ref(database, "posts/" + id); // reference to the post we want to update
      await update(postRef, updatedPost); // update the post in Firebase
      console.log("Post updated successfully.");
      alert("Post updated!");
      navigate(`/posts/${id}`); // navigate back to the post detail page after updating
    } catch (err) {
      console.error("Post update failed:", err); // Log error message
      alert("Something went wrong while updating the post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        type="text"
        placeholder="Session Name"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        className="form-input"
      />

      <button type="submit" className="submit-button">
        Update Post
      </button>
    </form>
  );
};

export default UpdaterPage;
