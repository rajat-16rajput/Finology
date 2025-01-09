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
    errorElement: <Error />,
    children: [
      { path: "/", element: <Dashboard /> }, // Default child route
      { path: "settings", element: <Settings /> },
      {
        path: "trendingstocks",
        element: <TrendingStocks />,
      },
    ],
  },
]);

export default contentRouter;
