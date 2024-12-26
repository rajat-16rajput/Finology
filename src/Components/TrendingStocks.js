import React, { useContext, useEffect, useState } from "react";
import { STOCK_API } from "../Utils/API";
import { SearchContext } from "../App";
const TrendingStocks = () => {
  const { searchText } = useContext(SearchContext);
  console.log(searchText);
  const [stockApiData, setStockApiData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  async function fetchStockApiData() {
    const res = await fetch(STOCK_API);
    const data = await res.json();
    setStockApiData(data);
    setFilteredList(data);
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

  return (
    <div className="trending-stocks">
      <div className="stock-title">
        <h3>TrendingStocks of India</h3>
        <button className="filter-btn">
          <h3>Filter</h3>
        </button>
      </div>
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
    </div>
  );
};

export default TrendingStocks;
