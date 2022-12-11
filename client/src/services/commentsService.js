import httpService from "./httpService";
export const leadsCommentsEndpoint = "leadComments/";
export const ordersCommentsEndpoint = "orderComments/";

const commentsService = {
  getLeadsComments: async () => {
    const { data } = await httpService.get(leadsCommentsEndpoint);
    return data;
  },
  getOrdersComments: async () => {
    const { data } = await httpService.get(ordersCommentsEndpoint);
    return data;
  },
  postLeadComment: async (payload) => {
    const { data } = await httpService.post(leadsCommentsEndpoint, payload);
    console.log(data);
    return data;
  },
  postOrderComment: async (payload) => {
    const { data } = await httpService.post(ordersCommentsEndpoint, payload);
    return data;
  },
  removeComment: async (payload, endpoint) => {
    const { data } = await httpService.delete(endpoint + payload._id, payload);
    return data;
  },
};

export default commentsService;
