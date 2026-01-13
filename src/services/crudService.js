import api from "./api";

export const crudService = {
  create: async (endpoint, payload) => {
    const res = await api.post(endpoint, payload);
    console.log("res:", JSON.stringify(res));
    return res.data;
  },
};