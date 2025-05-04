import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "/src/styles.css";
import gif from "/src/assets/background.png";
import whiteLogo from "/src/assets/logokanda.svg";

const onboardingScreens = [
  {
    title: "Welcome to Kanda Virtual Training Platform!",
    buttonLabel: "Get Started",
    image: gif, // use GIF for the first screen
    lightText: true, // light text on the first screen
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
      {/* for the first screen, the GIF as the background */}
      {currentScreen === 0 && (
        <div className="onboarding-video-container">
          <img src={gif} alt="Tesla GIF" className="onboarding-video" />
        </div>
      )}

      {/* logo */}
      <div className="onboarding-logo">
        {/* conditionally render the white logo on the first screen */}
        <img src={currentScreen === 0 ? whiteLogo : logo} alt="ZipTrip Logo" />
      </div>

      {/* content */}
      <div className="onboarding-content">
        {/* for other screens, show images */}
        {currentScreen !== 0 && (
          <div className="onboarding-image-container">
            <img src={image} alt="Illustration" className="onboarding-image" />
          </div>
        )}

        {/* text */}
        <h1 className="onboarding-title">{title}</h1>
        <p className="onboarding-paragraph">{description}</p>

        {/* dots indicator */}
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

        {/* navigation */}
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
