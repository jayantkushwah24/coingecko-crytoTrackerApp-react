// import React, { useContext } from "react";
// import { CurrencyContext } from "../context/CurrencyContext.js";
import currencyStore from "../state/store.js";

const Navbar = () => {
  // const { currency, setCurrency } = useContext(CurrencyContext);
  const { currency, setCurrency } = currencyStore();

  return (
    <div className="navbar bg-white shadow-md px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left Section (Menu) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-lg mt-3 w-52 p-3 shadow-lg border"
          >
            <li>
              <button
                onClick={() => setCurrency("usd")}
                className={`hover:bg-gray-100 rounded-md px-2 py-1 ${
                  currency === "usd" ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                USD
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrency("inr")}
                className={`hover:bg-gray-100 rounded-md px-2 py-1 ${
                  currency === "inr" ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                INR
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Center Section (Logo / Brand) */}
      <div className="navbar-center">
        <a className="text-2xl font-extrabold text-yellow-500 tracking-wide hover:text-yellow-600 transition">
          Crypto Tracker
        </a>
      </div>

      {/* Right Section (Actions) */}
      <div className="navbar-end space-x-3">
        {/* Search Icon */}
        <button className="btn btn-ghost btn-circle hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Notifications Icon */}
        <button className="btn btn-ghost btn-circle hover:bg-gray-100 transition">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-error indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
