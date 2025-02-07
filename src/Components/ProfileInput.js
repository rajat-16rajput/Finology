import { useEffect, useState } from "react";

const ProfileInput = ({ field, setDisableNext }) => {
  const { fieldName, label, type, validation } = field;

  const [error, setError] = useState({
    name: "",
    age: "",
    email: "",
    errorFlagName: true,
    errorFlagAge: true,
    errorFlagEmail: true,
  });
  const [info, setInfo] = useState({ name: "", age: "", email: "" });

  function handleChange(e, fName) {
    console.log("handleChange called");
    switch (fName) {
      case "name":
        if (e.target.value.length < validation.minLength) {
          console.log("setting error");
          setError((prevErr) => ({
            ...prevErr,
            name: validation.msg.minLengthError,
            errorFlagName: true,
          }));
        } else if (e.target.value.length > validation.maxLength) {
          setError((prevErr) => ({
            ...prevErr,
            name: validation.msg.maxLengthError,
            errorFlagName: true,
          }));
        } else {
          setError((prevErr) => ({
            ...prevErr,
            name: "",
            errorFlagName: false,
          }));
        }
        setInfo((info) => ({ ...info, name: e.target.value }));
        break;

      case "age":
        if (e.target.value < validation.minAge) {
          // console.log("Setting error : ", error);
          setError((prevErr) => ({
            ...prevErr,
            age: validation.msg.minAgeError,
            errorFlagAge: true,
          }));
          console.log("Setting error : ", error);
        } else if (e.target.value > validation.maxAge) {
          setError((prevErr) => ({
            ...prevErr,
            age: validation.msg.maxAgeError,
            errorFlagAge: true,
          }));
        } else {
          setError((prevErr) => ({ ...prevErr, age: "", errorFlagAge: false }));
        }
        setInfo((info) => ({ ...info, age: e.target.value }));
        break;

      case "email":
        function isValidEmail(temp) {
          return validation.emailRegex.test(temp);
        }

        if (!isValidEmail(e.target.value)) {
          setError((prevErr) => ({
            ...prevErr,
            email: validation.msg.invalidEmailMsg,
            errorFlagEmail: true,
          }));
          console.log("Flag changed to :", error.errorFlagEmail);
        } else {
          setInfo((info) => ({ ...info, email: e.target.value }));
          setError((prevErr) => ({
            ...prevErr,
            email: "",
            errorFlagEmail: false,
          }));
          console.log("Flag changed to :", error.errorFlagEmail);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <label>{label} : </label>
      <input
        type={type}
        value={info.fieldName}
        onChange={(e) => {
          handleChange(e, fieldName);
        }}
      ></input>
      {fieldName === "name" && <div className="error-msg">{error.name}</div>}
      {fieldName === "age" && <div className="error-msg">{error.age}</div>}
      {fieldName === "email" && <div className="error-msg">{error.email}</div>}

      {/* {label === "Name" ? (
        value?.length < validation.minLength && (
          <div className="error-msg">{validation.msg.minLengthError}</div>
        )
      ) : label === "Age" ? (
        value < 18 && <div className="error-msg">{}</div>
      ) : label === "Email" ? (
        isValidEmail(value) ? (
          <></>
        ) : (
          <div className="error-msg">{}</div>
        )
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default ProfileInput;
