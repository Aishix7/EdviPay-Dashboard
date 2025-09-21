import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">
            Edvi
          </div>
          <div>
            <h1 className="font-semibold text-lg">School Payments Dashboard</h1>
          </div>
        </div>

        <nav className="flex items-center space-x-3 text-sm">
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-medium" : "text-gray-600"
            }
          >
            All Transactions
          </NavLink>
          <NavLink
            to="/transactions/school"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-medium" : "text-gray-600"
            }
          >
            By School
          </NavLink>
          <NavLink
            to="/check-status"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-medium" : "text-gray-600"
            }
          >
            Check Status
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
