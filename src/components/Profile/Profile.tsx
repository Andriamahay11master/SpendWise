import { LuMoon } from "react-icons/lu";
import { MdOutlineLanguage } from "react-icons/md";
interface ProfileProps {
  image: string;
  name: string;
  email: string;
}
const Profile = ({ image, name, email }: ProfileProps) => {
  return (
    <div className="main-block profile-block">
      <div className="profil-top">
        <div className="profil-img">
          <img src={image} alt="Profile picture" />
        </div>
        <div className="profil-info">
          <p className="profil-name">{name}</p>
          <p className="profil-email">{email}</p>
        </div>
      </div>
      <div className="profil-bottom">
        <div className="profil-setting">
          <h3 className="title-h3">preferences</h3>
          <div className="profil-setting-item">
            <div className="profil-col">
              <div className="setting-icon">
                <LuMoon />
              </div>
              <p className="setting-name">Dark Mode</p>
            </div>
            <div className="profil-col"></div>
          </div>
          <div className="profil-setting-item">
            <div className="profil-col">
              <div className="setting-icon">
                <MdOutlineLanguage />
              </div>
              <p className="setting-name">Language</p>
            </div>
            <div className="profil-col"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
