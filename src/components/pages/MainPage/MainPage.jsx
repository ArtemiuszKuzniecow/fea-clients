import React from "react";
import { useSelector } from "react-redux";
import localStorageService from "../../../assets/services/localStorageService";
import { getUserDataSelector } from "../../../store/Users/selectors";
import Loader from "../../ui/Loader/Loader";
import style from "./MainPage.module.scss";

const MainPage = () => {
  const accessToken = localStorageService.getAccessToken();
  const { userData: currentUser, isLoading } = useSelector(
    getUserDataSelector()
  );

  return (
    <>
      {accessToken ? (
        !isLoading ? (
          <div className={style.container}>
            <div>
              <h3>Добрый день, {currentUser.name}!</h3>
            </div>
          </div>
        ) : (
          <Loader />
        )
      ) : (
        <div className={style.container}>
          <div>
            <h3>Пожалуйста, зарегистрируйтесь в системе!</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
