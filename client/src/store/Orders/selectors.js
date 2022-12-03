export const getOrdersLoadingStatus = () => (state) =>
  state?.orderData?.isLoading;

export const getAllOrders = (array) => (state) => {
  return state?.orderData?.orderData && !state?.userData?.isLoading && array
    ? Object.values(state?.orderData?.orderData).filter((order) =>
        array.includes(order.companyId)
      )
    : null;
};
