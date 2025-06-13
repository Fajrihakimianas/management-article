import Image from "next/image";
import React from "react";

export default function ArticleCard() {
  return (
    <div className="relative md:w-full w-fit h-fit mb-7">
      <Image
        src="/images/img-article.png"
        alt="Article Image"
        width={500}
        height={240}
        className="object-cover"
      />

      <div className="space-y-3 mt-4">
        <span className="text-xs md:text-sm font-light text-slate-600">
          April 13, 2025
        </span>

        <h2 className="text-base md:text-xl font-semibold text-slate-900">
          Cybersecurity Essentials Every Developer Should Know
        </h2>

        <p className="text-sm md:text-base font-normal text-slate-600">
          Protect your apps and users with these fundamental cybersecurity
          practices for developers.
        </p>

        <div className="flex text-sm gap-4">
          <div className="py-1 px-4 bg-blue-200 text-blue-900 rounded-full">
            Technology
          </div>

          <div className="py-1 px-4 bg-blue-200 text-blue-900 rounded-full">
            Design
          </div>
        </div>
      </div>
    </div>
  );
}
