import React, { useEffect } from "react";

const Profile = ({ data, setData, error }) => {
  const { name, age, email } = data;

  function handleChange(e, item) {
    setData((prevState) => ({ ...prevState, [item]: e.target.value }));
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="profile-form">
      <div>
        <label>Name : </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            handleChange(e, "name");
          }}
        ></input>
      </div>
      {!data.name && <span className="error-msg">Please enter your name</span>}

      <br></br>
      <div>
        <label>Age : </label>
        <input
          type="number"
          value={age}
          onChange={(e) => {
            handleChange(e, "age");
          }}
        ></input>
      </div>
      {data.age < 18 && (
        <span className="error-msg">Age should be above 18</span>
      )}
      <br></br>
      <div>
        <label>Email : </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            handleChange(e, "email");
          }}
        ></input>
      </div>
      {!data.email && <span className="error-msg">Please enter the email</span>}
    </div>
  );
};

export default Profile;
