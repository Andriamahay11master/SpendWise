import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchUser = async (username: string) => {
  const response = await fetch(
    `http://localhost:5000/api/user/username/${username}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

const Info = () => {
  const params = useParams({ strict: false });

  const { data: userInfo } = useQuery({
    queryKey: ["user", params.name],
    queryFn: () => fetchUser(params.name!),
  });

  const [formData, setFormData] = React.useState({
    avatar: userInfo?.avatar,
    username: userInfo?.username,
    email: userInfo?.email,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className="main-block info-block">
      <h1 className="title-h2">Change Personal Information</h1>
      <form onSubmit={handleUpdateData}>
        <div className="form-group">
          <div className="img-preview">
            <img
              src={`src/assets/${formData.avatar}`}
              alt={`Profile ${formData.username}`}
            />
          </div>
          <label htmlFor="avatar">Avatar</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="form-group form-button">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};
export default Info;
