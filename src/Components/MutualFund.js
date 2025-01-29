import React, { useEffect } from "react";

const MutualFund = ({ data, setData }) => {
  function handleChange(e) {
    // setData((prevData)=>({...prevData,data.sip.[name]}))
    setData((prevState) => ({
      ...prevState,
      sip: e.target.checked
        ? [...prevState.sip, e.target.name]
        : prevState.sip.filter((m) => m !== e.target.name),
    }));
  }

  useEffect(() => {
    console.log(data.sip);
  }, [data.sip]);
  return (
    <div>
      <div className="mututal-form">
        <input
          type="checkbox"
          name="smallCap"
          checked={data.sip.includes("smallCap")}
          onChange={(e) => handleChange(e)}
        />
        <label> Small Cap</label>
      </div>
      <div className="mututal-form">
        <input
          type="checkbox"
          name="midCap"
          checked={data.sip.includes("midCap")}
          onChange={(e) => handleChange(e)}
        />
        <label> Mid Cap</label>
      </div>
      <div className="mututal-form">
        <input
          type="checkbox"
          name="largeCap"
          checked={data.sip.includes("largeCap")}
          onChange={(e) => handleChange(e)}
        />
        <label> Large Cap</label>
      </div>
    </div>
  );
};

export default MutualFund;
