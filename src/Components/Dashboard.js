import Profile from "./Profile";
import MutualFund from "./MutualFund";
import MyStocks from "./MyStocks";
import DatePicker from "./DatePicker";
import { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    name: "Rajat",
    age: 24,
    email: "rajat@gmail.com",
    sip: [],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    { name: "Profile", component: Profile },
    { name: "MutualFund", component: MutualFund },
    { name: "MyStocks", component: MyStocks },
  ];

  function handleTabChange(index) {
    console.log(" handleTabChange()");
    setActiveIndex(index);
  }
  function handleNext() {
    setActiveIndex(activeIndex + 1);
  }

  function handlePrevious() {
    setActiveIndex(activeIndex - 1);
  }
  const ActiveComponent = tabs[activeIndex].component;
  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <DatePicker />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-tabs">
          {tabs.map((t, index) => (
            <div
              className="tab-btn"
              key={index}
              onClick={() => {
                handleTabChange(index);
              }}
            >
              {t.name}
            </div>
          ))}
        </div>
        <div className="dashboard-page">
          <ActiveComponent data={data} setData={setData} />
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
              >
                Next
              </button>
            )}
            {activeIndex === tabs.length - 1 && <button>Submit</button>}
          </div>
        </div>
        {/* <div>
          <button>Previous</button>
          <button>Next</button>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
