export const getOrdersCommentsLoadingStatus = () => (state) =>
  state.ordersCommentsData.isLoading;

export const getAllOrdersComments = (id) => (state) => {
  return state?.ordersCommentsData?.ordersCommentsData &&
    !state.userData.isLoading
    ? Object.values(state.ordersCommentsData.ordersCommentsData).filter(
        (comment) => comment.orderId === id
      )
    : null;
};
