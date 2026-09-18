import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "user",
    active: true,
  });

  const resetForm = () => {
    setFormData({
      email: "",
      username: "",
      password: "",
      role: "user",
      active: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      resetForm();
    }, 2000);
  };
  return (
    <div className="form-page signin">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confPwd">Confirmation password</label>
          <input
            type="password"
            name="confPwd"
            id="confPwd"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group form-button">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
