import { createBrowserRouter } from "react-router-dom";
import Main from "./Main";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import TrendingStocks from "./TrendingStocks";
import Error from "./Error";
const contentRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />, // Use Main as the parent route
    children: [
      { path: "/", element: <Dashboard />, errorElement: <Error /> }, // Default child route
      { path: "settings", element: <Settings />, errorElement: <Error /> },
      {
        path: "trendingstocks",
        element: <TrendingStocks />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default contentRouter;
