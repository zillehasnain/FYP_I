import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// CORRECT IMPORTS
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import QuizRoom from "./pages/QuizRoom";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Nexus from "./pages/Nexus";
import Leaderboard from "./pages/Leaderboard";
import IntelHub from "./pages/IntelHub";
import Admin from "./pages/Admin";

// The Gatekeeper
const AdminRoute = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Check if role is exactly "admin"
  if (!user || user.role !== 'admin') {
    alert("ACCESS DENIED: Admin Credentials Required.");
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz/:brandId" element={<QuizRoom />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/nexus" element={<Nexus />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* <Route path="/intel" element={<IntelHub />} /> */}
          <Route 
            path="/admin-overlord" 
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
