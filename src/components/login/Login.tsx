import React from "react";
import { type UserType } from "../../type/UserType";

interface LoginProps {
  user: UserType;
}

const Login = ({ userData }: LoginProps) => (
  <div className="login-page">
    <form>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="username"
          placeholder="Enter your username"
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
    </form>
  </div>
);

export default Login;
