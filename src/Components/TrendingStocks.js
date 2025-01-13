import React, { useContext, useEffect, useState } from "react";
import { STOCK_API } from "../Utils/API";
import { SearchContext, SearchBarVisibilityContext } from "../App";
const TrendingStocks = () => {
  //Global variables

  //Global Variable searchText to filter the table based on the input typed in the searchbox
  const { searchText } = useContext(SearchContext);
  console.log(searchText);

  //Global function to set the visibility of the searchBar
  const { setShowSearchBar } = useContext(SearchBarVisibilityContext);

  //Table Columns - Using to decide which column to display
  const [isCheckedOpen, setIsCheckedOpen] = useState(true);
  const [isCheckedClose, setIsCheckedClose] = useState(true);
  const [isCheckedHigh, setIsCheckedHigh] = useState(true);
  const [isCheckedLow, setIsCheckedLow] = useState(true);

  // Storing the data into the array variables
  const [stockApiData, setStockApiData] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  // To toggle the visibility of the filter menu
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  //Handling range of advanced filters
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(Infinity);

  const [isSearchTextValid, setIsSearchTextValid] = useState(true);

  //Fetching the data from the api and setting the StockApiData and FilterList.
  // I am rendering the table from the data present in the FilterList.
  // StockApiData is used as a base array which holds the data.
  async function fetchStockApiData() {
    const res = await fetch(STOCK_API);
    const data = await res.json();
    setStockApiData(data);
    setDisplayList(data);
    setSearchList(data);
  }

  useEffect(() => {
    //Calling the fetchStockApiData() on the initial render to fetch the data from the API.
    fetchStockApiData();

    //Setting the search bar visibility as true using setShowSearchBar global function
    //on the initial render of the Component TrendingStocks.
    setShowSearchBar(true);
  }, []);

  function filterSearchList() {
    //Filtering the list based on the searchText value.
    let searchListArray = displayList.filter((element) => {
      return element?.name.toLowerCase()?.includes(searchText.toLowerCase());
    });

    //Setting the FilteredList variable with the filtered Data in order to render the latest results.
    setDisplayList(searchListArray);
  }

  //Updating the filterSearchList whenever the searchText is Changed. Used DEBOUNCING
  useEffect(() => {
    if (searchText === "") {
      setDisplayList(stockApiData);
    }

    if (searchText !== "") {
      let timer = setTimeout(() => {
        filterSearchList();
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [searchText]);

  //Toggling the filter Menu
  function ToggleFilterMenuVisibility() {
    setShowFilterMenu(!showFilterMenu);
  }

  //Restoring Defaults
  function ResetFilters() {
    setMaxRange(Infinity);
    setMinRange(0);
    setDisplayList(stockApiData);
    setIsCheckedOpen(true);
    setIsCheckedClose(true);
    setIsCheckedHigh(true);
    setIsCheckedLow(true);
  }

  //Toggling Open,Close,High,Low  Columns in the table
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

  // function sortList() {
  //   sortedArray.sort((a, b) => {
  //     return +a.open - +b.open;
  //   });
  //   setFilteredList(sortedArray);
  // }

  function handleMaxChange(e) {
    setMaxRange(e.target.value);
  }
  function handleMinChange(e) {
    setMinRange(+e.target.value);
  }

  useEffect(() => {
    filterTableBasedOnRange();
  }, [minRange, maxRange]);

  function filterTableBasedOnRange() {
    if (minRange > maxRange) {
      alert("Please select proper minimum and maximum range");
      setMinRange(0);
      setMaxRange(Infinity);
    }
    let filteredTable = stockApiData.filter((element) => {
      return element.open >= minRange && element.open <= maxRange;
    });
    setDisplayList(filteredTable);
  }

  return (
    <div className="trending-stocks">
      <div className="stock-title">
        <h3>Trending Stocks of India</h3>
        <button
          className="filter-btn"
          onClick={() => {
            ToggleFilterMenuVisibility();
          }}
        >
          <h3>Filter</h3>
        </button>
      </div>
      <div className="stock-body">
        {showFilterMenu ? (
          displayList.length != 0 ? (
            //Rendering the Table from the FilteredList with the Filter Menu being displayed
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  {/* Displaying the Open Header for the Column if the checked value of the checkbox is true */}
                  {isCheckedOpen && (
                    <th>
                      <div className="table-heading">
                        <h4>Open</h4>
                        <img
                          src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                          width="20px"
                          height="20px"
                          alt="sort icon"
                        />
                      </div>
                    </th>
                  )}

                  {/* Displaying the High Header for the Column if the checked value of checkbox is true  */}
                  {isCheckedHigh && (
                    <th>
                      {" "}
                      <div className="table-heading">
                        <h4>High</h4>
                        <img
                          src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                          width="20px"
                          height="20px"
                          alt="sort icon"
                        />
                      </div>
                    </th>
                  )}

                  {/* Displaying the Low Header for the Column if the checked value of the check box is true */}
                  {isCheckedLow && (
                    <th>
                      {" "}
                      <div className="table-heading">
                        <h4>Low</h4>
                        <img
                          src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                          width="20px"
                          height="20px"
                          alt="sort icon"
                        />
                      </div>
                    </th>
                  )}

                  {/* Displaying the Close Header for the Column if the checked value of the check box is true */}
                  {isCheckedClose && (
                    <th>
                      {" "}
                      <div className="table-heading">
                        <h4>Close</h4>
                        <img
                          src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                          width="20px"
                          height="20px"
                          alt="sort icon"
                        />
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {displayList.map((element) => {
                  return (
                    <tr key={element.name}>
                      <td>
                        <strong>{element.open ? element.name : null}</strong>
                      </td>
                      {/* Displaying the Open Column if the checked value of the checkbox is true */}
                      {isCheckedOpen && <td>{element.open}</td>}
                      {/* Displaying the High Column if the checked value of the checkbox is true */}
                      {isCheckedHigh && <td> {element.high}</td>}
                      {/* Displaying the Low Column if the checked value of the checkbox is true */}
                      {isCheckedLow && <td>{element.low}</td>}
                      {/* Displaying the Close Column if the checked value of the checkbox is true */}
                      {isCheckedClose && <td> {element.close}</td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1>No Data</h1>
          )
        ) : (
          //Rendering the Table from the FilteredList when Filter menu is disabled
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>
                  {" "}
                  <div className="table-heading">
                    <h4>Open</h4>
                    <img
                      src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                      width="20px"
                      height="20px"
                      alt="sort icon"
                    />
                  </div>
                </th>
                <th>
                  {" "}
                  <div className="table-heading">
                    <h4>High</h4>
                    <img
                      src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                      width="20px"
                      height="20px"
                      alt="sort icon"
                    />
                  </div>
                </th>
                <th>
                  {" "}
                  <div className="table-heading">
                    <h4>Low</h4>
                    <img
                      src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                      width="20px"
                      height="20px"
                      alt="sort icon"
                    />
                  </div>
                </th>
                <th>
                  {" "}
                  <div className="table-heading">
                    <h4>Close</h4>
                    <img
                      src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                      width="20px"
                      height="20px"
                      alt="sort icon"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayList.map((element) => {
                return (
                  <tr key={element.name}>
                    <td>
                      <strong>{element.name}</strong>
                    </td>
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

            <div className="range-filter">
              <select
                className="min-range"
                value={minRange}
                onChange={(e) => {
                  handleMinChange(e);
                  //
                }}
              >
                <option value={0}>Min</option>
                <option value={2000}>2000</option>
                <option value={4000}>4000</option>
                <option value={6000}>6000</option>
                <option value={8000}>8000</option>
              </select>
              to
              <select
                className="max-range"
                value={maxRange}
                onChange={(e) => {
                  handleMaxChange(e);
                }}
              >
                <option value={Infinity}>8000+</option>
                <option value={2000}>2000</option>
                <option value={4000}>4000</option>
                <option value={6000}>6000</option>
                <option value={8000}>8000</option>
              </select>
            </div>

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
