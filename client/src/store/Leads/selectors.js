export const getAllLeadsSelector = (_id) => (state) => {
  if (state?.leadData?.leadData && !state?.userData?.isLoading) {
    return Object.values(state.leadData.leadData).filter(
      (lead) => lead.userID === _id
    );
  } else {
    return null;
  }
};
export const getLeadsLoadingStatus = () => (state) => state.leadData.isLoading;
