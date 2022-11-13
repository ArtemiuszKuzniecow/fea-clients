import httpService from "./httpService";
export const leadsCommentsEndpoint = "leadsComments/";
export const ordersCommentsEndpoint = "ordersComments/";

const commentsService = {
  getLeadsComments: async () => {
    const { data } = await httpService.get(leadsCommentsEndpoint);
    return data;
  },
  getOrdersComments: async () => {
    const { data } = await httpService.get(ordersCommentsEndpoint);
    return data;
  },
  putLeadComment: async (payload) => {
    const { data } = await httpService.put(
      leadsCommentsEndpoint + payload._id,
      payload
    );
    return data;
  },
  putOrderComment: async (payload) => {
    const { data } = await httpService.put(
      ordersCommentsEndpoint + payload._id,
      payload
    );
    return data;
  },
  removeComment: async (payload, endpoint) => {
    const { data } = await httpService.delete(endpoint + payload._id, payload);
    return data;
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
