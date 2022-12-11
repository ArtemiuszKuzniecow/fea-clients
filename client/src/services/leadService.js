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

  editLeadParam: async (id, payload) => {
    console.log("payload", payload);
    const { data } = await httpService.patch(leadEndpoint + id, {
      status: payload,
    });
    console.log("data", data);
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
