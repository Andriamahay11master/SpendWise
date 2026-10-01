import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

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
              src={`src/assets/${userInfo?.avatar}`}
              alt={`Profile ${userInfo?.username}`}
            />
          </div>
          <label htmlFor="avatar">Avatar</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={userInfo?.avatar}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo?.username}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo?.email}
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
