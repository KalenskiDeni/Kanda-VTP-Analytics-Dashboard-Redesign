import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config"; // Firebase Authentication
import { getDatabase, ref, set } from "firebase/database"; // Firebase Realtime Database
import "/src/styles.css";

import mailIcon from "../assets/icons/mail.icon.svg";
import userIcon from "../assets/icons/user-icon.svg";
import lockIcon from "../assets/icons/lock-icon.svg";
import logo from "/src/assets/kanda.svg";

// SignUpPage component
export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // navigate after registration

  function handleRegister(event) {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const mail = form.mail.value;
    const password = form.password.value;

    // create user with Firebase Authentication
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // update the user's profile with the display name and photo
        updateProfile(user, {
          displayName: name, // set the user's display name
          photoURL: "https://via.placeholder.com/150",
        }).then(() => {
          // save user data to the database
          storeUserData(user.uid, name, mail);
        });
      })
      .catch((error) => {
        let code = error.code.replaceAll("-", " ").replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  // store user data in Firebase Realtime Database
  function storeUserData(uid, name, mail) {
    const db = getDatabase(); // get the Firebase Database instance
    const userRef = ref(db, "users/" + uid); // create a reference to the user's data in Firebase
    set(userRef, {
      name: name,
      mail: mail,
      profilePicture: "https://via.placeholder.com/150", // default profile picture
    })
      .then(() => {
        console.log("User data saved successfully!");
        navigate("/profile"); // redirect to the Profile Page after successful registration
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
        setErrorMessage("Error saving user data.");
      });
  }

  return (
    <section id="register-page" className="page">
      <div className="header">
        <img src={logo} alt="Kanda Logo" className="logo-register1" />
      </div>
      <h1 className="register-title">Register</h1>

      <form
        id="register-form"
        className="register-form"
        onSubmit={handleRegister}
      >
        {/* name input */}
        <div className="input-group name-group">
          <label htmlFor="name" className="input-label">
            Name
          </label>
          <div className="input-field name-field">
            <img src={userIcon} alt="User icon" className="input-icon" />
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Ex: John Smith"
              required
              className="input-box"
            />
          </div>
        </div>

        {/* email input */}
        <div className="input-group email-group">
          <label htmlFor="mail" className="input-label">
            Email
          </label>
          <div className="input-field email-field">
            <img src={mailIcon} alt="Mail icon" className="input-icon" />
            <input
              id="mail"
              type="email"
              name="mail"
              placeholder="Ex: email@example.com"
              required
              className="input-box"
            />
          </div>
        </div>

        {/* password input */}
        <div className="input-group password-group">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <div className="input-field password-field">
            <img src={lockIcon} alt="Lock icon" className="input-icon" />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              required
              className="input-box"
            />
          </div>
        </div>

        {/* error message */}
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* register button */}
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>

      <p className="login-link">
        Already have an account?{" "}
        <Link to="/signin" className="login-link-text">
          Login here
        </Link>
      </p>
    </section>
  );
}
