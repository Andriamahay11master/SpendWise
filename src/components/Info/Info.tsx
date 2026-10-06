import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface UserInfo {
  avatar: string;
  username: string;
  email: string;
}

const fetchUser = async (username: string) => {
  const response = await fetch(
    `http://localhost:5000/api/user/username/${username}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

const updateUserById = async (id: string, data: UserInfo) => {
  const response = await fetch(`http://localhost:5000/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
};

const Info = () => {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate } = useMutation({
    mutationFn: (data: UserInfo) => updateUserById(userInfo?.id, data),
    onSuccess: async () => {
      console.log("User updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleUpdateData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData);
    navigate({ to: "/profile" });
  };
  return (
    <div className="main-block info-block">
      <h1 className="title-h2">Change Personal Information</h1>
      <form onSubmit={handleUpdateData}>
        <div className="form-group">
          <div className="img-preview">
            <img
              src={`/src/assets/${formData.avatar}`}
              alt={`Profile ${formData.username}`}
            />
          </div>
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleChangeImg}
            accept="image/*"
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
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default Info;
