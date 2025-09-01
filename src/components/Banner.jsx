import React from "react";

const Banner = () => {
  return (
    <div
      className="w-screen h-[50vh] bg-cover bg-top relative shadow-lg"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1463455851/photo/cryptocurrency-market-financial-data-and-candlesticks-internet-banking.jpg?s=1024x1024&w=is&k=20&c=iTK_kYVDlAibVlQ7L-CgR0NVezeg5mhS0Jk8lVyLHdc=')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
          Welcome to <span className="text-yellow-400">Crypto Tracker</span>
        </h1>
        <p className="text-xl mt-6 max-w-2xl font-light leading-relaxed">
          Stay updated with live cryptocurrency prices, market cap, and trends
        </p>
        <button className="mt-8 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
