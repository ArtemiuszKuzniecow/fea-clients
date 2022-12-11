import httpService from "./httpService";

export const ordersEndpoint = "order/";

const ordersService = {
  get: async () => {
    const { data } = await httpService.get(ordersEndpoint);
    return data;
  },
  postNewOrder: async (payload) => {
    const { data } = await httpService.post(ordersEndpoint, payload);
    return data;
  },
  editOrderParam: async (id, param, payload) => {
    const { data } = await httpService.patch(
      `${ordersEndpoint}${id}/${param}`,
      payload
    );
    return data;
  },
  removeOrder: async (payload) => {
    const { data } = await httpService.delete(
      ordersEndpoint + payload._id,
      payload
    );
    return data;
  },
};

export default ordersService;
