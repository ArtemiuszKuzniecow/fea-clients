export const getLeadsCommentsLoadingStatus = () => (state) =>
  state.leadsCommentData.isLoading;

export const getAllCompanyComments = (id) => (state) => {
  return id &&
    state?.leadsCommentData?.leadsCommentData &&
    !state?.userData?.isLoading
    ? Object.values(state?.leadsCommentData?.leadsCommentData).filter(
        (comment) => comment.companyId === id
      )
    : null;
};
