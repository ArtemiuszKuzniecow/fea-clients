import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import hamburger from "../../assets/icons/588a64e7d06f6719692a2d11.png";
import logo from "../../assets/icons/android-chrome-192x192.png";
import localStorageService from "../../assets/services/localStorageService";
import MyButton from "../../components/common/Button/MyButton";
import Loader from "../../components/ui/Loader/Loader";
import { getUserDataSelector } from "../../store/Users/selectors";
import style from "./PageLayout.module.scss";

const PageLayout = ({ children }) => {
  const accessToken = localStorageService.getAccessToken();
  const { userData: currentUser } = useSelector(getUserDataSelector());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <>
      <div className={style.header_container}>
        <Link to="/">
          <img src={logo} alt="logo" className={style.header_container_img} />
        </Link>

        {accessToken && (
          <div className={style.header_container_companies}>
            <Link to="/companies">
              <MyButton text="Компании" />
            </Link>
            <Link to="/orders-list">
              <MyButton text="Запросы" />
            </Link>
          </div>
        )}

        {!accessToken ? (
          <div className={style.header_container_login}>
            <Link to="/login" className={style.header_container_link}>
              <span>Вход</span>
            </Link>
            /
            <Link to="/registration" className={style.header_container_link}>
              <span>Регистрация</span>
            </Link>
          </div>
        ) : (
          <div className={style.header_container_login}>
            {currentUser && <h3>{currentUser.name}</h3>}
            <Link to="/logout" className={style.header_container_link}>
              <span>Выход</span>
            </Link>
          </div>
        )}

        <div
          className={style.header_container_hamburger}
          onClick={toggleCollapse}
        >
          {!isCollapsed ? (
            <>
              <img src={hamburger} className={style.hamburger} />
            </>
          ) : (
            <>
              {accessToken ? (
                currentUser ? (
                  <>
                    <span style={{ margin: 10 }}>{currentUser.name}</span>
                    <Link
                      to="/companies"
                      className={style.header_container_link}
                    >
                      <span>Компании</span>
                    </Link>
                    <Link
                      to="/orders-list"
                      className={style.header_container_link}
                    >
                      <span>Запросы</span>
                    </Link>
                    <Link
                      to="/new-company"
                      className={style.header_container_link}
                    >
                      <span>Добавить компанию</span>
                    </Link>
                    <Link
                      to="new-order"
                      className={style.header_container_link}
                    >
                      <span>Добавить запрос</span>
                    </Link>
                    <Link to="/logout" className={style.header_container_link}>
                      <span>Выход</span>
                    </Link>
                    <button className={style.header_container_hamburger_arrow}>
                      Закрыть меню
                    </button>
                  </>
                ) : (
                  <Loader />
                )
              ) : (
                <>
                  <Link to="/login" className={style.header_container_link}>
                    <span>Вход</span>
                  </Link>
                  <Link
                    to="/registration"
                    className={style.header_container_link}
                  >
                    <span>Регистрация</span>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <hr />
      {currentUser && (
        <div className={style.header_container_buttons}>
          {currentUser?.leads && (
            <Link to="/new-company">
              <MyButton text="Добавить компанию" />
            </Link>
          )}
          {currentUser?.orders && (
            <Link to="/new-order">
              <MyButton text="Добавить запрос" />
            </Link>
          )}
        </div>
      )}
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
