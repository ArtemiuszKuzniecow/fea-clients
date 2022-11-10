export const getAllLeadsSelector = (array) => (state) => {
  return state.leadData.leadData
    ? Object.values(state.leadData.leadData).filter((item) =>
        array.includes(item.id)
      )
    : null;
};
export const getLeadsLoaderStatus = () => (state) => state.leadData.isLoading;
