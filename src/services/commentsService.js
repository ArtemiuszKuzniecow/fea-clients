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
};

export default commentsService;
