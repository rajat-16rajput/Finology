import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// import Main from "./Components/Main";
// import Dashboard from "./Components/Dashboard";
// import Settings from "./Components/Settings";
// import TrendingStocks from "./Components/TrendingStocks";
import contentRouter from "./Components/contentRouter";
// import Error from "./Components/Error";
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
        <Footer />
      </SearchContext.Provider>
    </>
  );
}
//createBrowserRouter takes an array of routes and returns a router component
// export const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//     errorElement: <Error />,
//   },
//   {
//     path: "/settings",
//     element: <Settings />,
//     errorElement: <Error />,
//   },
//   {
//     path: "/trending-stocks",
//     element: <TrendingStocks />,
//     errorElement: <Error />,
//   },
// ]);

export default App;
