import React, { useEffect } from "react";
import MutualFundInput from "./MutualFundInput";
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

  const MutualFundData = [
    {
      id: 1,
      label: "Small Cap",
      type: "checkbox",
      name: "smallCap",
      checked: data.sip.includes("smallCap"),
      onChange: (e) => {
        return handleChange(e);
      },
    },
    {
      id: 2,
      label: "Mid Cap",
      type: "checkbox",
      name: "midCap",
      checked: data.sip.includes("midCap"),
      onChange: (e) => {
        return handleChange(e);
      },
    },
    {
      id: 3,
      label: "Large Cap",
      type: "checkbox",
      name: "largeCap",
      checked: data.sip.includes("largeCap"),
      onChange: (e) => {
        return handleChange(e);
      },
    },
  ];
  return (
    <div>
      {data.sip.length < 1 && (
        <div className="error-msg">
          Please select atleast one type of mutual fund
        </div>
      )}
      <div className="mututal-form">
        {MutualFundData.map((mf) => {
          return (
            <div key={mf.id}>
              <MutualFundInput mf={mf} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MutualFund;
