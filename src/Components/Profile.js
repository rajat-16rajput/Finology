import React, { useEffect } from "react";

const Profile = ({ data, setData }) => {
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
    </div>
  );
};

export default Profile;
