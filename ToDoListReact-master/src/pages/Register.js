import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service";
import "../styles/Auth.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("הסיסמאות לא תואמות");
      return;
    }

    if (password.length < 4) {
      setError("הסיסמה חייבת להיות לפחות 4 תווים");
      return;
    }

    setLoading(true);

    try {
      await service.register(username, password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>✨ הרשמה חדשה</h1>
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
          <input
            type="password"
            placeholder="אישור סיסמה"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
            required
          />
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "...נרשמת" : "הרשמה"}
          </button>
        </form>
        <p className="auth-switch">
          כבר יש לך חשבון?{" "}
          <button
            className="link-btn"
            onClick={() => navigate("/login")}
            type="button"
          >
            התחברות כאן
          </button>
        </p>
      </div>
    </div>
  );
}
