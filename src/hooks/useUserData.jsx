import { useSelector } from "react-redux";
import {
  getAllLeadsSelector,
  getLeadsLoadingStatus,
} from "../store/Leads/selectors";
import { getLeadsCommentsLoadingStatus } from "../store/LeadsComments/selecetors";
import {
  getAllOrders,
  getOrdersLoadingStatus,
} from "../store/Orders/selectors";
import { getOrdersCommentsLoadingStatus } from "../store/OrdersComments/selectors";
import {
  getIsLoadingStatus,
  getUserDataSelector,
} from "../store/Users/selectors";

const useUserData = () => {
  const isLoading = useSelector(getIsLoadingStatus());
  const isLeadsLoading = useSelector(getLeadsLoadingStatus());
  const isOrdersLoading = useSelector(getOrdersLoadingStatus());
  const isLeadsCommentsLoading = useSelector(getLeadsCommentsLoadingStatus());
  const isOrdersCommentsLoading = useSelector(getOrdersCommentsLoadingStatus());
  const state = useSelector(getUserDataSelector());
  const orders = useSelector(getAllOrders(state?.userData?.orders));
  const companies = useSelector(getAllLeadsSelector(state?.userData?.leads));

  return {
    isLoading,
    isLeadsLoading,
    isOrdersLoading,
    isLeadsCommentsLoading,
    orders,
    companies,
    isOrdersCommentsLoading,
  };
};

export default useUserData;
