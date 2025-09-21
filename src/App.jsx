import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Transactions from "./pages/Transactions";
import SchoolTransactions from "./pages/SchoolTransactions";
import CheckStatus from "./pages/CheckStatus";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/transactions" replace />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/school" element={<SchoolTransactions />} />
          <Route path="/check-status" element={<CheckStatus />} />
        </Routes>
      </main>
    </div>
  );
}
