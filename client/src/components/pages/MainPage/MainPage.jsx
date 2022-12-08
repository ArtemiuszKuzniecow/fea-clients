import React from "react";
import localStorageService from "../../../services/localStorageService";
import Headline from "../../common/Headline";
import MainPageContent from "../../common/MainPageContent/MainPageContent";

const MainPage = () => {
  const accessToken = localStorageService.getAccessToken();

  return (
    <>
      {accessToken ? (
        <MainPageContent />
      ) : (
        <div>
          <div>
            <Headline>Пожалуйста, зарегистрируйтесь в системе!</Headline>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
