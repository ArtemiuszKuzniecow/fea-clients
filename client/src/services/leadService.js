import httpService from "./httpService";

export const leadEndpoint = "leads/";

const leadService = {
  get: async () => {
    const { data } = await httpService.get(leadEndpoint);
    return data;
  },

  putNewLead: async (payload) => {
    const { data } = await httpService.put(leadEndpoint + payload.id, payload);
    return data;
  },

  editLeadParam: async (id, param, payload) => {
    const { data } = await httpService.put(
      `${leadEndpoint}${id}/${param}`,
      payload
    );
    return data;
  },

  removeLead: async (payload) => {
    const { data } = await httpService.delete(
      leadEndpoint + payload.id,
      payload
    );
    return data;
  },
};

export default leadService;
