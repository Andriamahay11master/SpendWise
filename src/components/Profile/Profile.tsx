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
    </div>
  );
};
export default Profile;
