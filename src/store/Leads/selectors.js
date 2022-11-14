export const getAllLeadsSelector = (id) => (state) => {
  if (state?.leadData?.leadData && !state?.userData?.isLoading) {
    return Object.values(state.leadData.leadData).filter(
      (lead) => lead.userId === id
    );
  } else {
    return null;
  }
};
export const getLeadsLoadingStatus = () => (state) => state.leadData.isLoading;
