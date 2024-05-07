import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VisaForm from "./components/VisaForm";
import AdminLogin from "./components/AdminLogin";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<VisaForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dash" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
