import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import hamburger from "../../assets/icons/588a64e7d06f6719692a2d11.png";
import logo from "../../assets/icons/android-chrome-192x192.png";
import localStorageService from "../../services/localStorageService";
import MyButton from "../../components/common/Button/MyButton";
import Loader from "../../components/ui/Loader/Loader";
import { getUserDataSelector } from "../../store/Users/selectors";
import useUserData from "../../hooks/useUserData";

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
      <div className="container bg-sky-50  border">
        <Link to="/">
          <img src={logo} alt="logo" width={50} />
        </Link>
        <div onClick={toggleCollapse}>
          {!isCollapsed ? (
            <>
              <img src={hamburger} width={30} />
            </>
          ) : (
            <>
              {accessToken ? (
                currentUser ? (
                  <>
                    <span style={{ margin: 10 }}>{currentUser.name}</span>
                    <Link to="/companies">
                      <span>Компании</span>
                    </Link>
                    <Link to="/orders-list">
                      <span>Запросы</span>
                    </Link>
                    <Link to="/new-company">
                      <span>Добавить компанию</span>
                    </Link>
                    <Link to="new-order">
                      <span>Добавить запрос</span>
                    </Link>
                    <Link to="/logout">
                      <span>Выход</span>
                    </Link>
                    <button>Закрыть меню</button>
                  </>
                ) : (
                  <Loader />
                )
              ) : (
                <>
                  <Link to="/login">
                    <span>Вход</span>
                  </Link>
                  <Link to="/registration">
                    <span>Регистрация</span>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
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
