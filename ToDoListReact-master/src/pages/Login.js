import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service";
import "../styles/Auth.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await service.login(username, password);
      navigate("/todos");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🔐 התחברות</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "...מתחבר" : "התחברות"}
          </button>
        </form>
        <p className="auth-switch">
          עדיין אין לך חשבון?{" "}
          <button
            className="link-btn"
            onClick={() => navigate("/register")}
            type="button"
          >
            הרשמה כאן
          </button>
        </p>
      </div>
    </div>
  );
}
