import httpService from "./httpService";

const usersEndpoint = "user/";

const userService = {
  get: async (id) => {
    const { data } = await httpService.get(`${usersEndpoint}${id}/`);
    return data;
  },
};

export default userService;
