import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="relative max-h-lg h-[500px] flex justify-center items-center bg-blend-color-dodge bg-[#2563EBDB]">
      <Image
        src="/images/hero-bg.jpg"
        alt="hero-bg"
        width={1920}
        height={500}
        className="object-cover absolute w-full h-full opacity-10"
      />

      <div className="max-w-4xl">
        <p className="text-lg md:text-xl font-semibold text-white text-center max-w-2xl mx-auto">
          Blog genzet
        </p>
        <h1 className="my-3 text-4xl md:text-5xl font-semibold text-white text-center">
          The Journal : Design Resources, Interviews, and Industry News
        </h1>
        <p className="text-lg md:text-xl text-white text-center max-w-2xl mx-auto">
          Your daily dose of design insights!
        </p>
      </div>
    </div>
  );
}
