import axiosInstance from "../utils/axiosInstances.js";

export async function fetchCoinDetails(id) {
  try {
    const response = await axiosInstance.get(`/coins/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
