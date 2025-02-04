const ProfileInput = ({ input }) => {
  const { label, type, value, onChange, error } = input;
  //   console.log("### label :", label);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function isValidEmail(email) {
    return emailRegex.test(email);
  }
  return (
    <div>
      <label>{label} : </label>
      <input type={type} value={value} onChange={onChange}></input>
      {label === "Name" ? (
        value.length < 3 && <div className="error-msg">{error}</div>
      ) : label === "Age" ? (
        value < 18 && <div className="error-msg">{error}</div>
      ) : label === "Email" ? (
        isValidEmail(value) ? (
          <></>
        ) : (
          <div className="error-msg">{error}</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileInput;
