export const getUserDataSelector = () => (state) => state.userData;
export const getLoggedInStatusSelector = () => (state) =>
  state.userData.isLoggedIn;
export const getErrorsSelector = () => (state) => state.userData.errors;
export const getIsLoadingStatus = () => (state) => state.userData.isLoading;
export const getClientStatusSelector = () => (state) =>
  state.userData.clientsStatusFilter;
export const getContactDateSelector = () => (state) =>
  state.userData.contactDateFilter;
