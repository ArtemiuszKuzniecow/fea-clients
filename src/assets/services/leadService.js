import httpService from "./httpService";

export const leadEndpoint = "leads/";

const leadService = {
  get: async () => {
    const { data } = await httpService.get(leadEndpoint);
    return data;
  },
};

export default leadService;
