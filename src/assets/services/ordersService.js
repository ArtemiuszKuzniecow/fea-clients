import httpService from "./httpService";

export const ordersEndpoint = "orders/";

const ordersService = {
  get: async () => {
    const { data } = await httpService.get(ordersEndpoint);
    return data;
  },
};

export default ordersService;
