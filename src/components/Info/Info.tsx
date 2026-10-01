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

  return (
    <div className="main-block info-block">
      <div className="info-top">
        <div className="info-img">
          <img
            src={`src/assets/${userInfo?.avatar}`}
            alt={`Profile ${userInfo?.username}`}
          />
        </div>
        <div className="info-info">
          <p className="info-name">{userInfo?.username}</p>
          <p className="info-email">{userInfo?.email}</p>
        </div>
      </div>
      <div className="info-bottom">
        <div className="info-setting">
          <h3 className="title-h3">personal information</h3>
          <p className="info-setting-item">Username: {userInfo?.username}</p>
          <p className="info-setting-item">Email: {userInfo?.email}</p>
        </div>
      </div>
    </div>
  );
};
export default Info;
