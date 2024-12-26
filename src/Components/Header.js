import { useContext, useState } from "react";
import { SearchBarVisibilityContext, SearchContext } from "../App";
const Header = () => {
  const { showSearchbar } = useContext(SearchBarVisibilityContext);
  const { setSearchText } = useContext(SearchContext);
  const [input, setInput] = useState("");

  function handleSearch() {
    setSearchText(input);
    setInput("");
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className="header">
      <img
        className="app-logo"
        src="https://static.vecteezy.com/system/resources/thumbnails/016/227/291/small/bull-with-chart-bar-logo-design-finance-logo-design-free-vector.jpg"
        alt="App Logo"
      />
      {showSearchbar && (
        <div className="searchbar-container">
          <input
            type="text"
            placeholder={` Search in Trending Stocks of India`}
            className="search-bar"
            value={input}
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <img
            className="search-icon"
            src="https://www.svgrepo.com/show/532555/search.svg"
            alt="search"
            onClick={() => {
              handleSearch();
            }}
          />
        </div>
      )}

      <img
        className="user-logo"
        src="https://www.svgrepo.com/show/507879/user-circle.svg"
        alt="user logo"
      ></img>
    </div>
  );
};
export default Header;
