import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import defaultUserImage from "../../assets/user.png";
import useConnectUser from "../../context/useConnectUser";

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

const uploadAvatar = async (file: File) => {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    body,
  });
  if (!response.ok) {
    throw new Error("Failed to upload image");
  }
  return (await response.json()) as { filename: string };
};

const Info = () => {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, setUser } = useConnectUser();
  const { data: userInfo } = useQuery({
    queryKey: ["user", params.name],
    queryFn: () => fetchUser(params.name!),
  });

  const [formData, setFormData] = React.useState<UserInfo>({
    avatar: "",
    username: "",
    email: "",
  });
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string>();
  const [submitError, setSubmitError] = React.useState<string>();

  React.useEffect(() => {
    if (userInfo) {
      setFormData({
        avatar: userInfo.avatar ?? "",
        username: userInfo.username ?? "",
        email: userInfo.email ?? "",
      });
    }
  }, [userInfo]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: {
      id: string;
      user: UserInfo;
      file: File | null;
    }) => {
      const avatar = data.file
        ? (await uploadAvatar(data.file)).filename
        : data.user.avatar;
      return updateUserById(data.id, { ...data.user, avatar });
    },
    onSuccess: async (updatedUser) => {
      if (user) {
        setUser({ ...user, ...updatedUser });
      }
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await navigate({ to: "/profile" });
    },
  });
  const handleUpdateData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = userInfo?._id ?? userInfo?.id;
    if (!userId) {
      setSubmitError(
        "Could not find this user's ID. Please reload and try again.",
      );
      return;
    }
    setSubmitError(undefined);
    mutate({ id: userId, user: formData, file: selectedFile });
  };
  return (
    <div className="main-block info-block">
      <h1 className="title-h2">Change Personal Information</h1>
      <form onSubmit={handleUpdateData}>
        <div className="form-group">
          <div className="img-preview">
            <img
              src={
                avatarPreview ??
                (formData.avatar
                  ? `http://localhost:5000/uploads/${formData.avatar}`
                  : defaultUserImage)
              }
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
        {(submitError || error) && (
          <p role="alert">{submitError ?? error?.message}</p>
        )}
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Info;
