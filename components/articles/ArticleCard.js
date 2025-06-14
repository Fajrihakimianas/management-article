"use client";

import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <Link href={`/articles/${article.id}`} className="block">
      <div className="relative md:w-full w-fit h-fit cursor-pointer mb-5">
        <Image
          src="/images/img-article.png"
          alt="Article Image"
          width={500}
          height={240}
          className="object-cover"
        />

        <div className="space-y-3 mt-4">
          <span className="text-xs md:text-sm font-light text-slate-600">
            {new Date(article?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>

          <h2 className="text-base md:text-xl font-semibold text-slate-900">
            {article?.title}
          </h2>

          <div
            className="md:text-base font-normal text-slate-600"
            style={{
              fontSize: "14px",
            }}
          >
            {parse(
              article?.content.length > 80
                ? `${article?.content.slice(0, 100)}...`
                : article?.content
            )}
          </div>

          <div className="flex text-sm gap-4">
            <div className="py-1 px-4 bg-blue-200 text-blue-900 rounded-full">
              {article?.category?.name || "Uncategorized"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
