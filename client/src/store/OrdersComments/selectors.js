export const getOrdersCommentsLoadingStatus = () => (state) =>
  state.ordersCommentsData.isLoading;

export const getAllOrdersCommentsById = (id) => (state) => {
  return id &&
    state?.ordersCommentsData?.ordersCommentsData &&
    !state.userData.isLoading
    ? Object.values(state.ordersCommentsData.ordersCommentsData).filter(
        (comment) => comment.orderId === id
      )
    : null;
};
export const getAllOrdersComments = () => (state) => {
  return state?.ordersCommentsData?.ordersCommentsData &&
    !state.userData.isLoading
    ? Object.values(state.ordersCommentsData.ordersCommentsData)
    : null;
};
