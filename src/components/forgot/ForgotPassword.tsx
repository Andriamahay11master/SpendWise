import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="form-page form-page-forgot">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group form-submit">
          <button type="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
