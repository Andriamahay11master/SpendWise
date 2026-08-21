import { useState } from "react";
import { LuMoon } from "react-icons/lu";
import { MdOutlineLanguage } from "react-icons/md";
interface ProfileProps {
  image: string;
  name: string;
  email: string;
}
const Profile = ({ image, name, email }: ProfileProps) => {
  const dataLang = ["FR", "EN", "ES"];
  const [language, setLanguage] = useState("EN");

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
  };
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
            <div className="profil-col">
              <label className="switch">
                <input type="checkbox" id="dark-mode-toggle" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="profil-setting-item">
            <div className="profil-col">
              <div className="setting-icon">
                <MdOutlineLanguage />
              </div>
              <p className="setting-name">Language</p>
            </div>
            <div className="profil-col">
              <div className="dropdown-language">
                <span className="dropdown-language-value">{language}</span>
                <ul className="dropdown-list">
                  {dataLang.map((lang, index) => (
                    <li
                      key={lang + index}
                      className="dropdown-item"
                      onClick={() => handleChangeLanguage(lang)}
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
