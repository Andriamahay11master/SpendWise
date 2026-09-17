import { Link } from "@tanstack/react-router";
import React from "react";

const Login = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="password-privacy">
            <input type="checkbox" id="show-password" />
            <label htmlFor="show-password">Show password</label>
          </div>
        </div>
        <div className="form-group form-button">
          <button type="submit" className="btn btn-primary">
            Connect
          </button>
        </div>
        <div className="forgot-password">
          <Link to="/forgot-password" className="btn btn-link">
            Forgot password ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
