import React from "react";

const MutualFundInput = ({ mf }) => {
  const { label, type, name, checked, onChange } = mf;
  console.log("####label : ", label);
  return (
    <div>
      <input type={type} name={name} checked={checked} onChange={onChange} />
      <label>{" " + label}</label>
    </div>
  );
};

export default MutualFundInput;
