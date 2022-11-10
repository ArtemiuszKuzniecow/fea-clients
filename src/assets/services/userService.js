import httpService from "../../assets/services/httpService";

const userService = {
  get: async (id) => {
    const { data } = await httpService.get(`users/${id}/`);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(`${payload.id}`, payload);
    return data;
  },
};

export default userService;
