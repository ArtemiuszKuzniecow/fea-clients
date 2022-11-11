export const getOrdersCommentsLoadingStatus = () => (state) =>
  state.ordersCommentsData.isLoading;

export const getAllOrdersComments = (array) => (state) => {
  return array &&
    state?.ordersCommentsData?.ordersCommentsData &&
    !state.userData.isLoading
    ? Object.values(state.ordersCommentsData.ordersCommentsData).filter(
        (comment) => array.includes(comment._id)
      )
    : null;
};
