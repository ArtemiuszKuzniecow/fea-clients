import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/icons/android-chrome-192x192.png";
import Hamburger from "../components/common/Hamburger";
import Loader from "../components/ui/Loader/Loader";
import useUserData from "../hooks/useUserData";
import localStorageService from "../services/localStorageService";
import { getUserDataSelector } from "../store/Users/selectors";

const PageLayout = ({ children }) => {
  const accessToken = localStorageService.getAccessToken();
  const { userData: currentUser } = useSelector(getUserDataSelector());
  const { companies, isLeadsLoading, isLoading } = useUserData();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <>
      <nav className="bg-sky-60 border-sky-200 px-2 sm:px-4 py-2.5 rounded dark:bg-sky-900 flex md:justify-around max-sm:justify-between sm:justify-between">
        <Link to="/">
          <img src={logo} alt="logo" width={50} />
        </Link>

        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
        ></div>
        <>
          {accessToken ? (
            currentUser ? (
              <div className="flex flex-col">
                <Hamburger func={toggleCollapse} />
                <div
                  className={`w-full md:block md:w-auto ${
                    isCollapsed && "hidden"
                  }`}
                  id="navbar-default"
                >
                  <ul
                    onClick={toggleCollapse}
                    className="flex flex-col p-4 mt-4 border border-sky-100 rounded-lg bg-sky-60 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-sky dark:bg-sky-800 md:dark:bg-sky-900 dark:border-sky-700"
                  >
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-sky-400 md:dark:hover:text-white dark:hover:bg-sky-700 dark:hover:text-white md:dark:hover:bg-transparents">
                      <Link to="/companies">Компании</Link>
                    </li>
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-sky-400 md:dark:hover:text-white dark:hover:bg-sky-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <Link to="/orders-list">Запросы</Link>
                    </li>
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-sky-400 md:dark:hover:text-white dark:hover:bg-sky-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <Link to="/new-company">Добавить компанию</Link>
                    </li>
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-sky-400 md:dark:hover:text-white dark:hover:bg-sky-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <Link to="new-order">Добавить запрос</Link>
                    </li>
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-sky-400 md:dark:hover:text-white dark:hover:bg-sky-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <Link to="/logout">Выход</Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Loader />
            )
          ) : (
            <>
              <Hamburger func={toggleCollapse} />
              <div
                className={`w-full md:block md:w-auto ${
                  isCollapsed && "hidden"
                }`}
                id="navbar-default"
              >
                <ul className="flex flex-col p-4 mt-4 border border-sky-100 rounded-lg bg-sky-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-sky dark:bg-sky-800 md:dark:bg-sky-900 dark:border-sky-700">
                  <Link to="/login">
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-sky-400 md:dark:hover:text-white dark:hover:bg-sky-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Вход
                    </li>
                  </Link>
                  <Link to="/registration">
                    <li className="block py-2 pl-3 pr-4 text-sky-700 rounded hover:bg-sky-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-sky-400 md:dark:hover:text-white dark:hover:bg-sky-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Регистрация
                    </li>
                  </Link>
                </ul>
              </div>
            </>
          )}
        </>
      </nav>
      <hr />
      <div>{children}</div>
    </>
  );
};

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PageLayout;
