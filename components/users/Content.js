import React from "react";
import ArticleCard from "../articles/ArticleCard";

export default function Content() {
  return (
    <div className="px-16 py-8">
      <h2 className="text-sm font-normal text-start mb-2">
        Showing : 20 of 240 articles
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
}
