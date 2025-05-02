import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "/src/styles.css";
import gif from "/src/assets/background.png";
import image1 from "/src/assets/onboarding1.png";
import image2 from "/src/assets/onboarding2.png";
import image3 from "/src/assets/onboarding3.png";
import image4 from "/src/assets/onboarding4.png";
import logo from "/src/assets/logoziptrip.png";
import whiteLogo from "/src/assets/logokanda.svg";

const onboardingScreens = [
  {
    title: "Welcome to Kanda Virtual Training Platform!",
    description:
      "Join a community of travelers who share rides and reduce the carbon footprint together. Connect with others, save money, and explore new places—all while making a positive impact on the environment.",
    buttonLabel: "Get Started",
    image: gif, // Use GIF for the first screen
    lightText: true, // Light text on the first screen
  },

];

function MyComponent() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const nextScreen = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const { title, description, buttonLabel, image, lightText } =
    onboardingScreens[currentScreen];

  return (
    <div
      className={`onboarding-container ${
        lightText ? "onboarding-light" : "onboarding-dark"
      }`}
    >
      {/* For the first screen, show the GIF as the background */}
      {currentScreen === 0 && (
        <div className="onboarding-video-container">
          <img src={gif} alt="Tesla GIF" className="onboarding-video" />
        </div>
      )}

      {/* Logo */}
      <div className="onboarding-logo">
        {/* Conditionally render the white logo on the first screen */}
        <img src={currentScreen === 0 ? whiteLogo : logo} alt="ZipTrip Logo" />
      </div>

      {/* Content */}
      <div className="onboarding-content">
        {/* For other screens, show images */}
        {currentScreen !== 0 && (
          <div className="onboarding-image-container">
            <img src={image} alt="Illustration" className="onboarding-image" />
          </div>
        )}

        {/* Text */}
        <h1 className="onboarding-title">{title}</h1>
        <p className="onboarding-paragraph">{description}</p>

        {/* Dots indicator */}
        {currentScreen > 0 && (
          <div className="onboarding-dots">
            {onboardingScreens.map((_, index) => (
              <div
                key={index}
                className={`onboarding-dot ${
                  currentScreen === index ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="onboarding-navigation">
          {currentScreen < onboardingScreens.length - 1 ? (
            <button className="onboarding-continue" onClick={nextScreen}>
              {buttonLabel}
            </button>
          ) : (
            <NavLink to="/signin" activeClassName="active">
              <button className="onboarding-continue">{buttonLabel}</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
