export const getUserDataSelector = () => (state) => state.userData;
export const getLoggedInStatusSelector = () => (state) =>
  state.userData.isLoggedIn;
export const getErrorsSelector = () => (state) => state.userData.errors;
export const getUserLeadsSelector = () => (state) =>
  state.userData.userData && Object.values(state.userData?.userData?.leads);
export const getIsLoadingStatus = () => (state) => state.userData.isLoading;
export const getUserOrdersSelector = () => (state) =>
  state.userData.userData && Object.values(state.userData.userData.orders);

export const getCompanyCommentsSelector = (companyId) => (state) => {
  if (state.userData.userData) {
    const comments = Object.values(state.userData?.userData?.comments.company);

    return comments.filter((comment) =>
      state.userData.userData.leads[companyId].companyComments.includes(
        comment._id
      )
    );
  }
};
export const getOrderCommentsSelector = (companyId, orderId) => (state) => {
  const comments = Object.values(state.userData?.userData?.comments.order);
  const commentsArray =
    state.userData.userData.leads[companyId].ordersComments[orderId];
  return (
    commentsArray &&
    comments.filter((comment) => commentsArray.includes(comment._id))
  );
};
