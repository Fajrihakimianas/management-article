/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { useArticlesStore } from "@/stores";

export default function ArticleList() {
  const { articles, totalArticles, fetchArticles, fetchCategories } =
    useArticlesStore();

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch categories first
        await fetchCategories();

        // Fetch articles with current filters
        await fetchArticles();
      } catch (error) {
        toast.error("Failed to load articles");
      }
    };

    initializeData();
  }, []);
  return (
    <div className="px-16 py-8">
      <h2 className="text-sm font-normal text-start mb-2">
        Showing : {articles.length} of {totalArticles} articles
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
