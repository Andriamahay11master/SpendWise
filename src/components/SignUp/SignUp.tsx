import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { type UserType } from "../../type/UserType";
import { useMutation } from "@tanstack/react-query";

interface UserProps {
  user: UserType;
}

const createUser = async ({ user }: UserProps) => {
  const response = await fetch("http://localhost:5000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role,
      active: user.active,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

const SignUp = () => {
  const navigate = useNavigate();
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

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate({ to: "/" });
      resetForm();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ user: formData });
  };

  return (
    <div className="form-page signup">
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
          <button
            type="button"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Signing up..." : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
