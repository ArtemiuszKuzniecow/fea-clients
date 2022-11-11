export const getLeadsCommentsLoadingStatus = () => (state) =>
  state.leadsCommentData.isLoading;

export const getAllCompanyComments = (array) => (state) => {
  return state?.leadsCommentData?.leadsCommentData &&
    !state?.userData?.isLoading
    ? Object.values(state?.leadsCommentData?.leadsCommentData).filter(
        (comment) => array.includes(comment._id)
      )
    : null;
};
