import axiosInstance from "./axiosInstance";

const itemService = {
  getTasks: async () => {
    const result = await axiosInstance.get("/items");
    return result.data;
  },

  addTask: async (name) => {
    const result = await axiosInstance.post("/items", {
      name: name,
      isComplete: false
    });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const result = await axiosInstance.put(`/items/${id}`, {
      id: id,
      isComplete: isComplete,
      name: "ignored"
    });
    return result.data;
  },

  deleteTask: async (id) => {
    await axiosInstance.delete(`/items/${id}`);
    return {};
  }
};

export default itemService;
