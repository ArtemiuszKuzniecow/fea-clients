export const getAllLeadsSelector = (array) => (state) => {
  return state?.leadData?.leadData && !state?.userData?.isLoading
    ? Object.values(state.leadData.leadData).filter((lead) =>
        array.includes(lead.id)
      )
    : null;
};
export const getLeadsLoadingStatus = () => (state) => state.leadData.isLoading;
