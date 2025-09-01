import { useState } from "react";
import { fetchCoinData } from "../service/fetchCoinData";
import { useQuery } from "@tanstack/react-query";

const CoinTable = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coins", page],
    queryFn: () => fetchCoinData(page, "usd"),
    retry: 2,
    retryDelay: 1000,
    gcTime: 1000 * 60 * 2,
    placeholderData: true,
  });
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <div className="w-[70vw] mx-auto my-6">
        {/* Table Header */}
        <div className="flex bg-gray-800 text-white font-semibold rounded-t-lg shadow-md">
          <div className="w-1/4 py-3 px-4 border-r border-gray-700">Name</div>
          <div className="w-1/4 py-3 px-4 border-r border-gray-700">Price</div>
          <div className="w-1/4 py-3 px-4 border-r border-gray-700">
            24H Change
          </div>
          <div className="w-1/4 py-3 px-4">Market Cap</div>
        </div>

        {/* Table Body */}
        <div className="bg-white rounded-b-lg shadow-md divide-y divide-gray-200">
          {Array.isArray(data) ? (
            data.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center hover:bg-gray-50 transition duration-200"
              >
                <div className="w-1/4 py-3 px-4 flex items-center space-x-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">{coin.name}</span>
                </div>
                <div className="w-1/4 py-3 px-4 font-mono text-gray-700">
                  ${coin.current_price.toLocaleString()}
                </div>
                <div
                  className={`w-1/4 py-3 px-4 font-medium ${
                    coin.price_change_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {coin.price_change_24h.toFixed(2)}%
                </div>
                <div className="w-1/4 py-3 px-4 text-gray-700">
                  ${coin.market_cap.toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No coin data available
            </div>
          )}
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        {page > 1 && (
          <button
            onClick={() => setPage((old) => old - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Previous Page
          </button>
        )}
        <button
          onClick={() => setPage((old) => old + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CoinTable;
