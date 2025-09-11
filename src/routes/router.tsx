import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "@/view/Dashboard";
import PatientManagement from "@/view/PatientManagement";
import App from "@/App";
import FMSAssignment from "@/view/FMSAssignment";
import Middleware from "@/middleware";
import data from "@/local-data/user.json";
import RegisterPage from "@/auth/Register";
import LoginPage from "@/auth/Login";
import AuthLayout from "@/components/layout/auth/AuthLayout";


/* 

handle routes of the project

*/
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Middleware context={data} />, // middleware wrapper,
        children: [
          { index: true, element: <Navigate to="/view/Dashboard" replace /> },
          { path: "/view/Dashboard", element: <Dashboard /> },
          { path: "/view/PatientManagement", element: <PatientManagement /> },
          { path: "/view/FMSAssignment", element: <FMSAssignment /> },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      { index: true, element: <Navigate to="/auth/Login" replace /> },
      { path: "/auth/Login", element: <LoginPage /> },
      { path: "/auth/Register", element: <RegisterPage /> },
    ],
  },
]);
