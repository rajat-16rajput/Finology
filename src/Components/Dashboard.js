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
  const [disableNext, setDisableNext] = useState(false);
  const tabs = [
    { name: "Profile", component: Profile },
    { name: "MutualFund", component: MutualFund },
    { name: "Portfolio", component: Portfolio },
  ];

  function handleNext() {
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
  console.log("disableNext : ", disableNext);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <DatePicker />
      </div>

      <div className="dashboard-content">
        {/* Dashboard Tabs */}
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
        {/* Dashboard Page */}
        <div className="dashboard-page">
          <ActiveComponent
            data={data}
            setData={setData}
            setDisableNext={setDisableNext}
          />

          {/* Dashboard Buttons - Next, Previous and Submit */}
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
                    ? disableNext
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
