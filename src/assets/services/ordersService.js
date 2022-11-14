import httpService from "./httpService";

export const ordersEndpoint = "orders/";

const ordersService = {
  get: async () => {
    const { data } = await httpService.get(ordersEndpoint);
    return data;
  },
  putNewOrder: async (payload) => {
    const { data } = await httpService.put(
      ordersEndpoint + payload.orderId,
      payload
    );
    return data;
  },
};

export default ordersService;
