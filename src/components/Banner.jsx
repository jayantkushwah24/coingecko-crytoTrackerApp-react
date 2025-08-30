import React from "react";

const Banner = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1463455851/photo/cryptocurrency-market-financial-data-and-candlesticks-internet-banking.jpg?s=1024x1024&w=is&k=20&c=iTK_kYVDlAibVlQ7L-CgR0NVezeg5mhS0Jk8lVyLHdc=')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content on top of banner */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">Welcome to My App</h1>
        <p className="text-lg mt-4">This is a banner with background image</p>
      </div>
    </div>
  );
};

export default Banner;
