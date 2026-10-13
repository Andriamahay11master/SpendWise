import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import useConnectUser from "../../context/useConnectUser";

const ChangePassword = () => {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const { user } = useConnectUser();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="main-block password-block">
      <div className="profil-top">
        <div className="profil-info">
          <p className="profil-name">{user?.username}</p>
          <p className="profil-email">{user?.email}</p>
        </div>
      </div>
      <div className="profil-bottom">
        <div className="profil-setting">
          <h3 className="title-h3">Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                placeholder="Enter your current password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                placeholder="Confirm your new password"
                required
              />
            </div>
            <div className="form-group form-submit">
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
