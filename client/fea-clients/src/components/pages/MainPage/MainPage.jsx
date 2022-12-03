import React from "react";
import localStorageService from "../../../services/localStorageService";
import style from "./MainPage.module.scss";
import MainPageContent from "../../common/MainPageContent/MainPageContent";

const MainPage = () => {
  const accessToken = localStorageService.getAccessToken();

  return (
    <>
      {accessToken ? (
        <MainPageContent />
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
