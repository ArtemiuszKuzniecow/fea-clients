import httpService from "./httpService";

const commentsService = {
  postNewComment: async (
    commentEndpoint,
    companyEndpoint,
    prevState,
    payload
  ) => {
    const { data } = await httpService.put(commentEndpoint, payload);

    const comments = await httpService.put(companyEndpoint, [
      ...prevState,
      payload._id,
    ]);
    return { comment: data.content, commentsArray: comments.data.content };
  },
  removeComment: async (commentEndpoint, companyEndpoint, newState) => {
    const { data } = await httpService.delete(commentEndpoint);
    const comments = await httpService.put(companyEndpoint, newState);

    return { comment: data.content, commentsArray: comments.data.content };
  },
};

export default commentsService;
