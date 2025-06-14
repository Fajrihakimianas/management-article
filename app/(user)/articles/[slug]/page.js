import ArticleDetail from "@/components/articles/ArticleDetail";
import Image from "next/image";
import React from "react";

export default async function DetailArticle({ params }) {
  const { slug } = await params;

  return (
    <>
      <div className="flex justify-between border-b items-center px-10 py-6 w-full">
        <h1 className="text-xl font-semibold text-slate-900">Article Title</h1>
        <span className="text-sm font-light text-slate-600">
          April 13, 2025
        </span>
      </div>

      <ArticleDetail slug={slug} />
    </>
  );
}
