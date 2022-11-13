export const getAllLeadsSelector = (id) => (state) => {
  return state?.leadData?.leadData && !state?.userData?.isLoading
    ? Object.values(state.leadData.leadData).filter(
        (lead) => lead.userId === id
      )
    : null;
};
export const getLeadsLoadingStatus = () => (state) => state.leadData.isLoading;
