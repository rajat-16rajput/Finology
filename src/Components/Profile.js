import React, { use, useState } from "react";
import ProfileInput from "./ProfileInput";
const Profile = ({ setDisableNext }) => {
  const profileData = [
    {
      fieldName: "name",
      label: "Name",
      type: "text",
      validation: {
        minLength: 3,
        maxLength: 20,
        msg: {
          minLengthError: "Name should be of atleast 3 characters",
          maxLengthError: "Name should be of atmost 20 characters",
          defaultError: "Please enter your name",
        },
      },
    },
    {
      fieldName: "age",
      label: "Age",
      type: "number",
      validation: {
        minAge: 18,
        maxAge: 40,
        msg: {
          minAgeError: "Age should be atleast 18 years",
          maxAgeError: "Age should be atmost 40 years",
          defaultError: "Please enter your age",
        },
      },
    },
    {
      fieldName: "email",
      label: "Email",
      type: "email",
      validation: {
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        msg: {
          invalidEmailMsg: "Invalid Email !",
        },
      },
    },
  ];

  return (
    <div className="profile-form">
      <div>
        {profileData.map((field) => {
          return (
            <div key={field.fieldName}>
              <ProfileInput field={field} setDisableNext={setDisableNext} />
              <br></br>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
