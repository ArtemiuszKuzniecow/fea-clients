import httpService from "./httpService";

export const ordersEndpoint = "orders/";

const ordersService = {
  get: async (id) => {
    const { data } = await httpService.get(id + ordersEndpoint);
    return data;
  },
};

export default ordersService;
