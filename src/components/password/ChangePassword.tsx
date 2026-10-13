import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useConnectUser from "../../context/useConnectUser";

const fetchUser = async (username: string) => {
  const response = await fetch(
    `http://localhost:5000/api/user/username/${username}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

const updateUserById = async (id: string, data: { password: string }) => {
  const response = await fetch(`http://localhost:5000/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Failed to update user");
  }

  return payload;
};

const validateCurrentPassword = async (username: string, password: string) => {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Current password is incorrect");
  }

  return payload;
};

const initialFormData = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePassword = () => {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useConnectUser();
  const [formData, setFormData] = useState(initialFormData);
  const [submitError, setSubmitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { data: userInfo } = useQuery({
    queryKey: ["user", params.name],
    queryFn: () => fetchUser(params.name!),
    enabled: Boolean(params.name),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!userInfo?.username) {
      setSubmitError("User information is not available yet.");
      return;
    }

    if (!formData.currentPassword || !formData.newPassword) {
      setSubmitError("Please complete all password fields.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setSubmitError("New password must be at least 6 characters long.");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setSubmitError("New passwords do not match.");
      return;
    }

    setIsSaving(true);

    try {
      await validateCurrentPassword(userInfo.username, formData.currentPassword);

      const userId = userInfo?._id ?? userInfo?.id;
      if (!userId) {
        throw new Error("Unable to find this user record.");
      }

      await updateUserById(userId, { password: formData.newPassword });
      queryClient.invalidateQueries({ queryKey: ["user", params.name] });
      setFormData(initialFormData);
      navigate({ to: "/" });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to change password. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSaving(false);
    }
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
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                required
              />
            </div>
            {submitError ? (
              <p className="form-error" role="alert">
                {submitError}
              </p>
            ) : null}
            <div className="form-group form-submit">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? "Updating..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
