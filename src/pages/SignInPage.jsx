import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import "/src/styles.css";

import arrowIcon from "../assets/icons/arrow-icon.svg";
import mailIcon from "../assets/icons/mail.icon.svg";
import lockIcon from "../assets/icons/lock-icon.svg";
import appleIcon from "../assets/icons/apple-icon.svg";
import googleIcon from "../assets/icons/google-icon.svg";
import logo from "/src/assets/kanda.svg";
import backButton from "../assets/icons/backButton.svg";

// SignInPage component
export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        let code = error.code.replaceAll("-", " ").replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  // return the JSX for the SignInPage component
  return (
    <section id="sign-in-page" className="page">
      <div className="header">
        <img src={logo} alt="Kanda Logo" className="logo-register" />
      </div>
      <h1 className="login-title">Log In</h1>

      <form id="sign-in-form" className="login-form" onSubmit={handleSignIn}>
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
              autoComplete="current-password"
              required
              className="input-box"
            />
          </div>
        </div>

        <p className="forgot-password">Forgot Password?</p>

        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>

      <p className="register-link">
        Do not have an account?{" "}
        <Link to="/signup" className="register-link-text">
          Register
        </Link>
      </p>

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </section>
  );
}
