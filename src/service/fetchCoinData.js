import axiosInstance from "../utils/axiosInstances.js";

export async function fetchCoinData(page = 1, currency) {
  const perPage = 10;
  try {
    const response = await axiosInstance.get(
      `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
