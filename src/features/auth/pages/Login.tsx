import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/auth/auth.css";
import { loginUser, registerUser } from "../api/authApi";

export default function LoginPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/welcome");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const data = await loginUser({ username, password });

        // Store JWT
        localStorage.setItem("token", data.token);

        console.log("Login Response:", data);

        // Redirect after login
        navigate("/welcome");
      } else {
        await registerUser({ username, password });

        alert("Registration successful ✅");
        setIsLogin(true);
        setUsername("");
        setPassword("");
      }
    } catch (err: any) {
      console.error("Auth Error:", err);

      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{isLogin ? "Log In" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? " Sign Up" : " Log In"}
          </span>
        </p>
      </div>
    </div>
  );
}
