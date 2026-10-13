const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  return (
    <div className="main-block profile-block">
      <div className="profil-top">
        <div className="profil-img">
          <img
            src={
              user?.avatar
                ? `http://localhost:5000/uploads/${user.avatar}`
                : defaultUserImage
            }
            alt={`Profile ${user?.username}`}
          />
        </div>
        <div className="profil-info">
          <p className="profil-name">{user?.username}</p>
          <p className="profil-email">{user?.email}</p>
        </div>
      </div>
      <div className="profil-bottom">
        <div className="profil-setting">
          <h3 className="title-h3">Change Password</h3>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
