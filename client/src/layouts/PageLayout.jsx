import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/icons/android-chrome-192x192.png";
import Hamburger from "../components/common/Hamburger";
import Loader from "../components/ui/Loader/Loader";
import localStorageService from "../services/localStorageService";
import { getUserDataSelector } from "../store/Users/selectors";

const PageLayout = ({ children }) => {
  const accessToken = localStorageService.getAccessToken();
  const { userData: currentUser } = useSelector(getUserDataSelector());
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className="pb-7">
      <nav className="bg-white border-sky-200 px-2 sm:px-4 py-2.5 rounded flex md:justify-around max-sm:justify-between sm:justify-between border-black drop-shadow-md items-center">
        <Link to="/">
          <img src={logo} alt="logo" width={60} />
        </Link>

        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
        ></div>
        <>
          {accessToken ? (
            currentUser ? (
              <div
                className={`flex flex-col ${isCollapsed ? "" : "items-end"}`}
              >
                <div className="w-1/4">
                  <Hamburger func={toggleCollapse} />
                </div>
                <div
                  className={`w-full md:block md:w-auto ${
                    isCollapsed && "hidden"
                  }`}
                  id="navbar-default"
                >
                  <ul
                    onClick={() => setIsCollapsed(true)}
                    className="flex flex-col p-4 mt-4 border border-sky-100 rounded-lg bg-sky-60 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-sky items-center"
                  >
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                      <Link to="/companies">Компании</Link>
                    </li>
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                      <Link to="/orders-list">Запросы</Link>
                    </li>
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                      <Link to="/new-company">Добавить компанию</Link>
                    </li>
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                      <Link to="/new-order">Добавить запрос</Link>
                    </li>
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                      <Link to="/logout">Выход</Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Loader />
            )
          ) : (
            <div className="flex flex-col w-1/4">
              <Hamburger func={toggleCollapse} />
              <div
                className={`w-full md:block md:w-auto ${
                  isCollapsed && "hidden"
                }`}
                id="navbar-default"
              >
                <ul className="flex flex-col p-4 mt-4 border border-sky-100 rounded-lg bg-sky-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-sky">
                  <Link to="/login">
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                      Вход
                    </li>
                  </Link>
                  <Link to="/registration">
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                      Регистрация
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </>
      </nav>
      <div>{children}</div>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PageLayout;
