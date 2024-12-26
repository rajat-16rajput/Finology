import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBarVisibilityContext } from "../App";
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { setShowSearchBar } = useContext(SearchBarVisibilityContext);
  // console.log("showSearchbar###", showSearchbar);

  // console.log("showSearchbar###", showSearchbar);
  // function handleSearchbarDisplay() {
  //   setShowSearchBar(true);
  // }
  function handleSidebar() {
    setSidebar(!sidebar);
  }
  return (
    <div>
      {!sidebar ? (
        <>
          <ul className="sidebar-open">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <div
                className="sidebar-item"
                onClick={() => {
                  setShowSearchBar(false);
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/535437/home.svg"
                  alt="Dashboard"
                  className="icon"
                />
                <li>Dashboard</li>
              </div>
            </Link>
            <Link to={"/Settings"} style={{ textDecoration: "none" }}>
              <div
                className="sidebar-item"
                onClick={() => {
                  setShowSearchBar(false);
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/495688/setting-2.svg"
                  alt="Settings"
                  className="icon"
                />
                <li>Settings</li>
              </div>
            </Link>

            <Link to={"/TrendingStocks"} style={{ textDecoration: "none" }}>
              <div
                className="sidebar-item"
                onClick={() => {
                  setShowSearchBar(true);
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/134943/stocks-graphic.svg"
                  alt="Stocks"
                  className="icon"
                />
                <li>Trending Stocks</li>
              </div>
            </Link>
          </ul>
          <button className="sticky-button" onClick={() => handleSidebar()}>
            {sidebar ? (
              <img
                src="https://www.svgrepo.com/show/486236/right-arrow-backup-2.svg"
                alt="arrow"
                className="icon"
              ></img>
            ) : (
              <img
                src="https://www.svgrepo.com/show/486232/left-arrow-backup-2.svg"
                alt="arrow"
                className="icon"
              ></img>
            )}
          </button>
        </>
      ) : (
        <>
          <ul className="sidebar-close">
            <Link to={"/"}>
              <div
                className="sidebar-item"
                onClick={() => {
                  setShowSearchBar(false);
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/535437/home.svg"
                  alt="Home"
                  className="icon"
                />
              </div>
            </Link>
            <Link to={"/Settings"}>
              <div
                className="sidebar-item"
                onClick={() => {
                  setShowSearchBar(false);
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/495688/setting-2.svg"
                  alt="Settings"
                  className="icon"
                />
              </div>
            </Link>

            <Link to={"/TrendingStocks"}>
              <div
                className="sidebar-item"
                onClick={() => {
                  setShowSearchBar(true);
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/134943/stocks-graphic.svg"
                  alt="Stocks"
                  className="icon"
                />
              </div>
            </Link>
          </ul>
          <button className="sticky-button" onClick={() => handleSidebar()}>
            {sidebar ? (
              <img
                src="https://www.svgrepo.com/show/486236/right-arrow-backup-2.svg"
                alt="arrow"
                className="icon"
              ></img>
            ) : (
              <img
                src="https://www.svgrepo.com/show/486232/left-arrow-backup-2.svg"
                alt="arrow"
                className="icon"
              ></img>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
