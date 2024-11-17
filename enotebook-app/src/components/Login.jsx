import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = new useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const LoginUser = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login/";
    const { email, password } = user;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (!json.error) {
        localStorage.setItem("auth-token", json);
        console.log(localStorage.getItem("auth-token"));
        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };
  const handleChnage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={LoginUser}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChnage}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChnage}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
