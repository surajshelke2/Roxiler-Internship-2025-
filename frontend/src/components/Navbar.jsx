import React from 'react';
import { Link } from 'react-router-dom'; 
import SalesData from './SalesData';

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-10 shadow-md p-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <div className="flex md:order-2">
          {/* Right corner with name and ID */}
          <div className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <span className="font-semibold">Suraj Shelke</span>
            <span className="text-sm bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">{`RBTL22IT154`}</span>
          </div>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <ul className="flex flex-col p-0 md:p-0 mt-2 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <Link
                to="/"
                className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/transactions" 
                className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700"
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                to="/statistics" 
                className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700"
              >
                Statistics
              </Link>
            </li>
            <li>
              <div className="block py-1 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700">
                <h2 className="text-lg font-semibold mb-2">Sales Data Overview</h2>
                <SalesData />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
