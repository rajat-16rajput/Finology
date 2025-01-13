import React, { useContext, useEffect, useState } from "react";
import { STOCK_API } from "../Utils/API";
import { SearchContext, SearchBarVisibilityContext } from "../App";
const TrendingStocks = () => {
  //Global variables

  //Global Variable searchText to filter the table based on the input typed in the searchbox
  const { searchText, setSearchText } = useContext(SearchContext);
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
  const [filterList, setFilterList] = useState([]);
  const [originalFilterList, setOriginalFilterList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  // To toggle the visibility of the filter menu
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  //Toggling asc desc sequence
  const [sequence, setSequence] = useState(false);

  //Handling range of advanced filters
  const [minRange, setMinRange] = useState(-Infinity);
  const [maxRange, setMaxRange] = useState(Infinity);

  //Fetching the data from the api and setting the StockApiData and FilterList.
  // I am rendering the table from the data present in the FilterList.
  // StockApiData is used as a base array which holds the data.
  async function fetchStockApiData() {
    const res = await fetch(STOCK_API);
    const data = await res.json();
    setStockApiData(data);
    setOriginalFilterList(data);
    setFilterList(data);
    setSearchList(data);
    setSortedList(data);
  }

  //useEffect to fetch and render data
  useEffect(() => {
    //Calling the fetchStockApiData() on the initial render to fetch the data from the API.
    fetchStockApiData();

    //Setting the search bar visibility as true using setShowSearchBar global function
    //on the initial render of the Component TrendingStocks.
    setShowSearchBar(true);
  }, []);

  function filterSearchList() {
    //Filtering the Search list (Outer) based on the searchText value.
    let searchListArray = stockApiData.filter((element) => {
      return element?.name.toLowerCase()?.includes(searchText.toLowerCase());
    });
    //Setting the searchListArray variable with the filtered Data in order to render the latest results.
    setSearchList(searchListArray);
  }

  function filterFilterList() {
    let filterListArray = originalFilterList.filter((element) => {
      return element?.name.toLowerCase()?.includes(searchText.toLowerCase());
    });

    setFilterList(filterListArray);
  }

  //Updating the filterSearchList whenever the searchText is Changed. Used DEBOUNCING
  useEffect(() => {
    if (showFilterMenu) {
      if (searchText === "") {
        setFilterList(originalFilterList);
      }
      if (searchText !== "") {
        filterFilterList();
      }
    }

    //Code for the search list (OUTER)
    if (searchText === "") {
      setSearchList(stockApiData);
    }
    //Searching in the Search (outer list)
    if (searchText !== "") {
      let timer = setTimeout(() => {
        filterSearchList();
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }

    //Code for the filter list (INNER)
  }, [searchText]);

  //Toggling the filter Menu
  function ToggleFilterMenuVisibility() {
    setShowFilterMenu(!showFilterMenu);
    setSearchText("");
    console.log("fILTER BTN CLICKED");
    setSearchList(stockApiData);
    setOriginalFilterList(stockApiData);
    setFilterList(stockApiData);
  }

  //Restoring Defaults
  function ResetFilters() {
    setMaxRange(Infinity);
    setMinRange(0);
    setOriginalFilterList(stockApiData);
    setFilterList(stockApiData);
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

  function handleMaxChange(e) {
    setMaxRange(e.target.value);
  }
  function handleMinChange(e) {
    setMinRange(+e.target.value);
  }

  useEffect(() => {
    filterTableBasedOnRange();
    setSearchText("");
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
    setOriginalFilterList(filteredTable);
    setFilterList(filteredTable);
  }

  // useEffect(() => {
  //   setSearchList(sortedList);
  // }, [sortedList]);
  let sortList;

  if (!showFilterMenu) {
    sortList = [...stockApiData];
  } else {
    sortList = [...originalFilterList];
  }

  function handleSortOpen() {
    if (sequence === false) {
      sortList.sort(function (a, b) {
        return a.open - b.open;
      });
    } else {
      sortList.sort(function (a, b) {
        return b.open - a.open;
      });
    }
    setSequence(!sequence);
    setSearchList(sortList);
    setFilterList(sortList);
  }
  function handleSortClose() {
    if (sequence === false) {
      sortList.sort(function (a, b) {
        return a.close - b.close;
      });
    } else {
      sortList.sort(function (a, b) {
        return b.close - a.close;
      });
    }
    setSequence(!sequence);
    setSearchList(sortList);
    setFilterList(sortList);
  }
  function handleSortHigh() {
    if (sequence === false) {
      sortList.sort(function (a, b) {
        return a.high - b.high;
      });
    } else {
      sortList.sort(function (a, b) {
        return b.high - a.high;
      });
    }
    setSequence(!sequence);
    setSearchList(sortList);
    setFilterList(sortList);
  }
  function handleSortLow() {
    if (sequence === false) {
      sortList.sort(function (a, b) {
        return a.low - b.low;
      });
    } else {
      sortList.sort(function (a, b) {
        return b.low - a.low;
      });
    }
    setSequence(!sequence);
    setSearchList(sortList);
  }

  function handleSortName() {
    console.log("Sort name called");

    if (sequence === false) {
      sortList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortList.sort(function (a, b) {
        return b.name.localeCompare(a.name);
      });
    }
    setSequence(!sequence);
    setSearchList(sortList);
    setFilterList(sortList);
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
          filterList.length !== 0 ? (
            //Rendering the Table from the FilteredList with the Filter Menu being displayed
            <table>
              <thead>
                <tr>
                  <th>
                    <div className="table-heading">
                      <h4>Name</h4>
                      <img
                        src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                        width="20px"
                        height="20px"
                        alt="sort icon"
                        onClick={() => {
                          handleSortName();
                        }}
                        className="sort-icon"
                      />
                    </div>
                  </th>
                  <th>
                    {" "}
                    <div className="table-heading">
                      <h4>Open</h4>
                      <img
                        src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                        width="20px"
                        height="20px"
                        alt="sort icon"
                        onClick={() => {
                          handleSortOpen();
                        }}
                        className="sort-icon"
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
                        onClick={() => {
                          handleSortHigh();
                        }}
                        className="sort-icon"
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
                        onClick={() => {
                          handleSortLow();
                        }}
                        className="sort-icon"
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
                        onClick={() => {
                          handleSortClose();
                        }}
                        className="sort-icon"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterList.map((element) => {
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
            <div className="search-error">
              <img
                src="https://www.svgrepo.com/show/278414/error.svg"
                alt="error"
                width="200px"
                height="200px"
              />
              <h1>No Data Found</h1>
            </div>
          )
        ) : searchList.length !== 0 ? (
          //Rendering the Table from the FilteredList when Filter menu is disabled
          <table>
            <thead>
              <tr>
                <th>
                  <div className="table-heading">
                    <h4>Name</h4>
                    <img
                      src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                      width="20px"
                      height="20px"
                      alt="sort icon"
                      onClick={() => {
                        handleSortName();
                      }}
                      className="sort-icon"
                    />
                  </div>
                </th>
                <th>
                  {" "}
                  <div className="table-heading">
                    <h4>Open</h4>
                    <img
                      src="https://www.svgrepo.com/show/527495/sort-vertical.svg"
                      width="20px"
                      height="20px"
                      alt="sort icon"
                      onClick={() => {
                        handleSortOpen();
                      }}
                      className="sort-icon"
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
                      onClick={() => {
                        handleSortHigh();
                      }}
                      className="sort-icon"
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
                      onClick={() => {
                        handleSortLow();
                      }}
                      className="sort-icon"
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
                      onClick={() => {
                        handleSortClose();
                      }}
                      className="sort-icon"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {searchList.map((element) => {
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
        ) : (
          <div className="search-error">
            <img
              src="https://www.svgrepo.com/show/278414/error.svg"
              alt="error"
              width="200px"
              height="200px"
            />
            <h1>No Data Found</h1>
          </div>
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
