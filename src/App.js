import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import contentRouter from "./Components/contentRouter";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { createContext } from "react";

export const SearchBarVisibilityContext = createContext();
export const SearchContext = createContext();
function App() {
  const [showSearchbar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        <SearchBarVisibilityContext.Provider
          value={{ showSearchbar, setShowSearchBar }}
        >
          <Header />
          <RouterProvider router={contentRouter} />
        </SearchBarVisibilityContext.Provider>
      </SearchContext.Provider>
      <Footer />
    </>
  );
}

export default App;
