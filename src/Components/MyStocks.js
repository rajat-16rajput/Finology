import React, { useEffect, useState } from "react";

const MyStocks = () => {
  const [stockList, setStockList] = useState([]);
  async function fetchData() {
    const res = await fetch("http://localhost:4000/api/myStocks");
    const data = await res.json();
    setStockList(data);
  }
  useEffect(() => {
    fetchData();
  }, [stockList]);

  return (
    <div className="my-stocks">
      <h1>My Stocks</h1>
      <ol className="my-stock-list">
        {stockList.map((entry, index) => {
          return (
            <li key={index}>
              {entry.name} {"  x " + index + 1 * 2}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default MyStocks;
