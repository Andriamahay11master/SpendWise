const ForgotPassword = () => {
  return (
    <div className="form-page form-page-forgot">
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group form-submit">
          <button type="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
