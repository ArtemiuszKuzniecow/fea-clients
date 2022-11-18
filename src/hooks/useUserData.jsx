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
  getClientStatusSelector,
  getContactDateSelector,
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
  const currentUserData = useSelector(getUserDataSelector());
  const companies = useSelector(getAllLeadsSelector(state?.userData?.id));
  const companiesIds =
    !isLeadsLoading && companies && Object.values(companies.map((c) => c.id));
  const orders = useSelector(getAllOrders(companiesIds));
  const clientStatus = useSelector(getClientStatusSelector());
  const contactDate = useSelector(getContactDateSelector());

  return {
    isLoading,
    isLeadsLoading,
    isOrdersLoading,
    isLeadsCommentsLoading,
    isOrdersCommentsLoading,
    currentUserData,
    orders,
    companies,
    clientStatus,
    contactDate,
  };
};

export default useUserData;
