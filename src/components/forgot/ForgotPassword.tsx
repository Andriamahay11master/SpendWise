import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

interface ForgotPasswordData {
  email: string;
}

const requestPasswordReset = async ({ email }: ForgotPasswordData) => {
  const response = await fetch(
    "http://localhost:5000/api/user/forget-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Unable to process your request.");
  }

  return response.json();
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordMutation.mutate({ email });
  };

  const resetPasswordMutation = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      setEmail("");
    },
  });

  return (
    <div className="form-page form-page-forgot">
      <form onSubmit={handleSubmit} noValidate={false}>
        <h1>Forgot password?</h1>
        <p>Enter your email address to request password reset instructions.</p>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            required
            value={email}
            onChange={handleChange}
            disabled={resetPasswordMutation.isPending}
          />
        </div>
        <div className="form-group form-button">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={resetPasswordMutation.isPending}
          >
            {resetPasswordMutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
        {resetPasswordMutation.isSuccess && (
          <p role="status">
            Reset instructions have been requested successfully.
          </p>
        )}
        {resetPasswordMutation.isError && (
          <p role="alert">{resetPasswordMutation.error.message}</p>
        )}
        <div className="form-action">
          <Link to="/login" className="btn btn-link">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
