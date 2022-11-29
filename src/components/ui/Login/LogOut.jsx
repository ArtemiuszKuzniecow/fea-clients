import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import localStorageService from "../../../services/localStorageService";
import { UserSlice } from "../../../store/Users/reducer";
import Loader from "../Loader/Loader";

const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorageService.removeAuthData();
    dispatch(UserSlice.actions.clearData());
    history.push("/");
  }, []);
  return <Loader />;
};

export default LogOut;
