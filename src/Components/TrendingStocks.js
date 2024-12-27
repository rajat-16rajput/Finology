import React, { useContext, useEffect, useState } from "react";
import { STOCK_API } from "../Utils/API";
import { SearchContext, SearchBarVisibilityContext } from "../App";
const TrendingStocks = () => {
  const { searchText } = useContext(SearchContext);
  const { setShowSearchBar } = useContext(SearchBarVisibilityContext);
  const [isCheckedOpen, setIsCheckedOpen] = useState(true);
  const [isCheckedClose, setIsCheckedClose] = useState(true);
  const [isCheckedHigh, setIsCheckedHigh] = useState(true);
  const [isCheckedLow, setIsCheckedLow] = useState(true);
  const [stockApiData, setStockApiData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  async function fetchStockApiData() {
    const res = await fetch(STOCK_API);
    const data = await res.json();
    setStockApiData(data);
    setFilteredList(data);
    setShowSearchBar(true);
  }
  useEffect(() => {
    fetchStockApiData();
  }, []);

  function filterList() {
    let filteredListArray = stockApiData.filter((element) => {
      return element?.name.toLowerCase()?.includes(searchText.toLowerCase());
    });
    setFilteredList(filteredListArray);
  }

  useEffect(() => {
    filterList();
  }, [searchText]);

  function filterTable() {
    setShowFilterMenu(!showFilterMenu);
    console.log("Filter btn clicked ", showFilterMenu);
  }

  function ResetFilters() {
    console.log("Reset Filter");
    setIsCheckedOpen(false);
    setIsCheckedClose(false);
    setIsCheckedHigh(false);
    setIsCheckedLow(false);
  }

  function handleChangeOpen() {
    setIsCheckedOpen(!isCheckedOpen);
  }

  function handleChangeClose() {
    setIsCheckedClose(!isCheckedClose);
  }

  function handleChangeHigh() {
    setIsCheckedHigh(!isCheckedHigh);
  }
  function handleChangeLow() {
    setIsCheckedLow(!isCheckedLow);
  }
  return (
    <div className="trending-stocks">
      <div className="stock-title">
        <h3>TrendingStocks of India</h3>
        <button
          className="filter-btn"
          onClick={() => {
            filterTable();
          }}
        >
          <h3>Filter</h3>
        </button>
      </div>
      <div className="stock-body">
        {showFilterMenu ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                {isCheckedOpen && <th>Open</th>}
                {isCheckedHigh && <th>High</th>}
                {isCheckedLow && <th>Low</th>}
                {isCheckedClose && <th>Close</th>}
              </tr>
            </thead>
            <tbody>
              {filteredList.map((element) => {
                return (
                  <tr key={element.name}>
                    <td>{element.name}</td>
                    {isCheckedOpen && <td>{element.open}</td>}
                    {isCheckedHigh && <td>{element.high}</td>}
                    {isCheckedLow && <td>{element.low}</td>}
                    {isCheckedClose && <td>{element.close}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((element) => {
                return (
                  <tr key={element.name}>
                    <td>{element.name}</td>
                    <td>{element.open}</td>
                    <td>{element.high}</td>
                    <td>{element.low}</td>
                    <td>{element.close}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {showFilterMenu && (
          <div className="filter-menu">
            <div className="filter-header">
              <p>Filters</p>
              <p
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => {
                  ResetFilters();
                }}
              >
                Reset Filters
              </p>
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <ul>
              <li className="filter-list-item">
                <input
                  type="checkbox"
                  name="open"
                  checked={isCheckedOpen}
                  onChange={() => {
                    handleChangeOpen();
                  }}
                />
                <span id="option">Open</span>
              </li>
              <li className="filter-list-item">
                <input
                  type="checkbox"
                  name="high"
                  checked={isCheckedHigh}
                  onChange={() => {
                    handleChangeHigh();
                  }}
                />
                <span id="option">High</span>
              </li>
              <li className="filter-list-item">
                <input
                  type="checkbox"
                  name="low"
                  checked={isCheckedLow}
                  onChange={() => {
                    handleChangeLow();
                  }}
                />
                <span id="option">Low</span>
              </li>
              <li className="filter-list-item">
                <input
                  type="checkbox"
                  name="close"
                  checked={isCheckedClose}
                  onChange={() => {
                    handleChangeClose();
                  }}
                />
                <span id="option">Close</span>
              </li>
            </ul>
            <br></br>
            <hr></hr>
            <br></br>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingStocks;
