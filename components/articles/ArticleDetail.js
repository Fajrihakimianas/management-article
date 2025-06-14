/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useArticlesStore } from "@/stores";
import { toast } from "sonner";
import ArticleCard from "./ArticleCard";

export default function ArticleDetail({ slug }) {
  const { articles, detailArticle, fetchArticleBySlug } = useArticlesStore();

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch article by slug
        await fetchArticleBySlug(slug);
      } catch (error) {
        toast.error("Failed to load articles");
      }
    };

    initializeData();
  }, []);

  return (
    <div className="md:px-[160px] md:py-[40px] flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <p className="text-base md:text-base font-normal text-slate-600 mb-2">
          {new Date(detailArticle?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          Created by {detailArticle?.user?.role}
        </p>

        <h2 className="text-2xl md:text-3xl max-w-2xl font-semibold text-slate-900">
          {detailArticle?.title}
        </h2>
      </div>

      <div className="relative w-full">
        <Image
          src="/images/img-detail.png"
          alt="Article Image"
          width={800}
          height={500}
          className="w-full h-[580px]"
        />

        <div
          className="md:text-base font-normal text-slate-600 mt-5"
          style={{
            fontSize: "16px",
          }}
        >
          {parse(detailArticle?.content || "No content available")}
        </div>
      </div>

      <div className="relative w-full mt-10">
        <h2 className="text-lg md:text-lg font-semibold text-slate-900 mb-4">
          Other articles
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
