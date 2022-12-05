import httpService from "./httpService";

const usersEndpoint = "users/";

const userService = {
  get: async (id) => {
    const { data } = await httpService.get(`${usersEndpoint}${id}/`);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(
      `${usersEndpoint}${payload.id}/`,
      payload
    );
    return data;
  },
};

export default userService;
