import httpService from "./httpService";

export const leadEndpoint = "lead/";

const leadService = {
  get: async () => {
    const { data } = await httpService.get(leadEndpoint);
    return data;
  },

  postNewLead: async (payload) => {
    const { data } = await httpService.post(leadEndpoint, payload);
    return data;
  },

  editLeadParam: async (id, parameter, payload) => {
    const { data } = await httpService.patch(leadEndpoint + id, {
      [parameter]: payload,
    });
    return data;
  },

  editLead: async (payload) => {
    const { data } = await httpService.patch(
      leadEndpoint + payload._id,
      payload
    );
    return data;
  },

  removeLead: async (payload) => {
    const { data } = await httpService.delete(
      leadEndpoint + payload._id,
      payload
    );
    return data;
  },
};

export default leadService;
