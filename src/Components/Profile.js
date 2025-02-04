import React, { useEffect } from "react";
import ProfileInput from "./ProfileInput";
const Profile = ({ data, setData, error }) => {
  const { name, age, email } = data;

  function handleChange(e, item) {
    setData((prevState) => ({ ...prevState, [item]: e.target.value }));
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const profileData = [
    {
      inputID: 1,
      label: "Name",
      type: "text",
      value: name,
      onChange: (e) => {
        return handleChange(e, "name");
      },
      error: "Name should be between 3-50 characters",
    },
    {
      inputID: 2,
      label: "Age",
      type: "number",
      value: age,
      onChange: (e) => {
        return handleChange(e, "age");
      },
      error: "Age should be more than 18 years",
    },
    {
      inputID: 3,
      label: "Email",
      type: "email",
      value: email,
      onChange: (e) => {
        return handleChange(e, "email");
      },
      error: "Invaid Email",
    },
  ];

  return (
    <div className="profile-form">
      <div>
        {profileData.map((input) => {
          return (
            <div key={input.inputID}>
              <ProfileInput input={input} />
              <br></br>
            </div>
          );
        })}
      </div>
      {/* {!data.name && <span className="error-msg">Please enter your name</span>}

      <br></br>
      <div>
        <ProfileInput
          label="Age"
          type="number"
          value={age}
          onChange={(e) => {
            handleChange(e, "age");
          }}
        />
      </div>
      {data.age < 18 && (
        <span className="error-msg">Age should be above 18</span>
      )}
      <br></br>
      <div>
        <ProfileInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            handleChange(e, "email");
          }}
        />
      </div>
      {!data.email && <span className="error-msg">Please enter the email</span>} */}
    </div>
  );
};

export default Profile;
