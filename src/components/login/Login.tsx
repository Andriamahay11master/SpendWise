import { Link } from "@tanstack/react-router";
import React from "react";
import { type UserType } from "../../type/UserType";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

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
  return response.json();
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
    role: "user",
    active: true,
  });

  const { data: dataUser, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchConnectUser({ user: formData }),
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
    setTimeout(() => {
      if (dataUser?.length > 0) {
        navigate({ to: "/" });
      }
      resetForm();
    }, 2000);
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Connect"}
          </button>
        </div>
        <div className="form-action">
          <Link to="/signIn" className="btn btn-link">
            Sign in
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
