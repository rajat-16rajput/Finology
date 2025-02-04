import Profile from "./Profile";
import MutualFund from "./MutualFund";
import Portfolio from "./Portfolio";
import DatePicker from "./DatePicker";
import { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    sip: [],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState({});
  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name) {
          err.name = "Please Enter your name";
        }
        if (!data.age) {
          err.age = "Please Enter your age";
        }
        if (!data.email) {
          err.email = "Please Enter your email";
        }
        setError(err);
        return err.name || err.age || err.email ? false : true;
      },
    },
    { name: "MutualFund", component: MutualFund },
    { name: "Portfolio", component: Portfolio },
  ];

  // function handleTabChange(index) {
  //   console.log(" handleTabChange()");
  //   setActiveIndex(index);
  // }
  function handleNext() {
    if (data.sip.length < 1) {
    }
    setActiveIndex(activeIndex + 1);
  }

  function handlePrevious() {
    setActiveIndex(activeIndex - 1);
  }

  function handleSubmit() {
    console.log("Submit clicked");
    alert("Data Submitted Successfully");
    setActiveIndex(0);
    setData({
      name: "",
      age: "",
      email: "",
      sip: [],
    });
  }

  const ActiveComponent = tabs[activeIndex].component;
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <DatePicker />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-tabs">
          {tabs.map((t, index) => (
            <div className="tab-btn" key={index}>
              {index === activeIndex ? (
                <div className="active-tab">{t.name}</div>
              ) : (
                t.name
              )}
            </div>
          ))}
        </div>
        <div className="dashboard-page">
          <ActiveComponent data={data} setData={setData} error={error} />
          <div className="dashboard-btn-container">
            {activeIndex > 0 && (
              <button
                onClick={() => {
                  handlePrevious();
                }}
              >
                Previous
              </button>
            )}
            {activeIndex < tabs.length - 1 && (
              <button
                onClick={() => {
                  handleNext();
                }}
                disabled={
                  activeIndex === 0
                    ? !data.name || data.age < 18 || !data.email
                    : activeIndex === 1
                    ? data.sip.length < 1
                    : null
                }
              >
                Next
              </button>
            )}
            {activeIndex === tabs.length - 1 && (
              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
