import httpService from "./httpService";
import { leadEndpoint } from "./leadService";
const leadsCommentsEndpoint = "leadsComments/";
const ordersCommentsEndpoint = "ordersComments/";

const commentsService = {
  getLeadsComments: async () => {
    const { data } = await httpService.get(leadsCommentsEndpoint);
    return data;
  },
  getOrdersComments: async () => {
    const { data } = await httpService.get(ordersCommentsEndpoint);
    return data;
  },
  postLeadComment: async (payload, array, companyId) => {
    const comment = await httpService.put(
      leadsCommentsEndpoint + payload._id,
      payload
    );
    const comments = await httpService.put(
      `${leadEndpoint}${companyId}/companyComments/`,
      array
    );
    return {
      commentData: comment.data.content,
      commentsArray: comments.data.content,
      companyId: companyId,
    };
  },
  // postNewComment: async (
  //   commentEndpoint,
  //   companyEndpoint,
  //   prevState,
  //   payload
  // ) => {
  //   const { data } = await httpService.put(commentEndpoint, payload);

  //   const comments = await httpService.put(companyEndpoint, [
  //     ...prevState,
  //     payload._id,
  //   ]);
  //   return { comment: data.content, commentsArray: comments.data.content };
  // },
  // removeComment: async (commentEndpoint, companyEndpoint, newState) => {
  //   const { data } = await httpService.delete(commentEndpoint);
  //   const comments = await httpService.put(companyEndpoint, newState);

  //   return { comment: data.content, commentsArray: comments.data.content };
  // },
};

export default commentsService;
