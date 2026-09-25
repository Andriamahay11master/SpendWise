import { Link } from "@tanstack/react-router";
import React from "react";
import { type UserType } from "../../type/UserType";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useConnectUser from "../../context/useConnectUser";

interface userProps {
  user: UserType;
}

const fetchConnectUser = async ({ user }: userProps) => {
  const response = await fetch("http://localhost:5000/api/login", {
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
  return (await response.json()) as UserType;
};

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useConnectUser();
  const [viewPass, setViewPass] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
    role: "user",
    active: true,
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: fetchConnectUser,
    onSuccess: (connectedUser) => {
      setUser(connectedUser);
      resetForm();
      navigate({ to: "/" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      username: "",
      password: "",
      role: "user",
      active: true,
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ user: formData });
  };

  return (
    <div className="form-page login">
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
        <div className="form-group form-pass">
          <label htmlFor="password">Password</label>
          <input
            type={viewPass ? "text" : "password"}
            name="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="password-privacy">
            <input
              type="checkbox"
              id="show-password"
              onChange={() => setViewPass(!viewPass)}
            />
            <label htmlFor="show-password">
              {viewPass ? <FaEyeSlash /> : <FaEye />}
            </label>
          </div>
        </div>
        <div className="form-group form-button">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Connect"}
          </button>
        </div>
        {error && <p role="alert">{error.message}</p>}
        <div className="form-action">
          <Link to="/signUp" className="btn btn-link">
            Sign Up
          </Link>
          <Link to="/forgot-password" className="btn btn-link">
            Forgot password ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
