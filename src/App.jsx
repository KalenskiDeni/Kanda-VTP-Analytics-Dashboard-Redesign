import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Users from "./pages/Users";
import UpdatePage from "./pages/UpdatePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Devices from "./pages/Devices";
import AllSessions from "./pages/AllSessions";
import SessionFilterOverlay from "./pages/SessionFilterOverlay";
import LeaderboardPage from "./pages/LeaderboardPage";
import MainIssues from "./pages/MainIssues";

import "/src/styles.css"; 

import OnBoarding from "./pages/OnBoarding";

import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  // Authentication state handler
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // If a user is authenticated, update state
      setIsAuth(true);
      localStorage.setItem("isAuth", "true");
    } else {
      // If no user is authenticated, reset state
      setIsAuth(false);
      localStorage.removeItem("isAuth");
    }
  });

  // Private Routes for authenticated users
  const privateRoutes = (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/posts/:id/update" element={<UpdatePage />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/all-sessions" element={<AllSessions />} />
        <Route
          path="/sessionfilteroverlay"
          element={<SessionFilterOverlay />}
        />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/mainissues" element={<MainIssues />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );

  // Public Routes for unauthenticated users
  const publicRoutes = (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/onboarding" element={<OnBoarding />} />
      <Route path="*" element={<Navigate to="/onboarding" />} />
    </Routes>
  );

  // Render the routes based on authentication state
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default App;
