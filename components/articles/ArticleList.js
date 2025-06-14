/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { useArticlesStore } from "@/stores";
import PaginationComponent from "../pagination/Pagination";

export default function ArticleList() {
  const {
    totalPages,
    currentPage,
    articles,
    totalArticles,
    fetchArticles,
    fetchCategories,
    changePage,
  } = useArticlesStore();

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

  const handlePageChange = async (page) => {
    try {
      await changePage(page);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error("Failed to change page");
    }
  };

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

      {totalArticles > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
