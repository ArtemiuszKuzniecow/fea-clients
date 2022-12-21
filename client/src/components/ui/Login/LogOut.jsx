import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import localStorageService from "../../../services/localStorageService";
import { LeadsSlice } from "../../../store/Leads/reducer";
import { LeadsCommentsSlice } from "../../../store/LeadsComments/reducer";
import { OrdersSlice } from "../../../store/Orders/reducer";
import { OrdersCommentsSlice } from "../../../store/OrdersComments/reducer";
import { UserSlice } from "../../../store/Users/reducer";
import Loader from "../Loader/Loader";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorageService.removeAuthData();
    dispatch(UserSlice.actions.clearData());
    dispatch(LeadsSlice.actions.clearData());
    dispatch(LeadsCommentsSlice.actions.clearData());
    dispatch(OrdersSlice.actions.clearData());
    dispatch(OrdersCommentsSlice.actions.clearData());
    navigate.push("/");
  }, []);
  return <Loader />;
};

export default LogOut;
