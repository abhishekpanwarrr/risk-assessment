import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Risk from "./pages/Risk/Risk";
import Assessment from "./pages/Assessment/Assessment";
import Report from "./pages/Report/Report";
import NotFound from "./pages/NotFound/NotFound";
import RiskScenarios from "./pages/RiskScenarios/RiskScenarios";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Risk />} />
        <Route path="risk" element={<Risk />} />
        <Route path="scenarios" element={<RiskScenarios />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="reports" element={<Report />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
