import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/view/Dashboard";
import PatientManagement from "@/view/PatientManagement";
import App from "@/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard  /> },
      { path: "/view/PatientManagement", element: <PatientManagement /> },
    ],
  },
]);
