/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useArticlesStore } from "@/stores";

export default function ArticleDetail({ slug }) {
  const { detailArticle, fetchArticleBySlug } = useArticlesStore();

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
          {detailArticle?.createdAt} Created by {detailArticle?.user?.role}
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
          className="md:text-base font-normal text-slate-600"
          style={{
            fontSize: "14px",
          }}
        >
          {parse(detailArticle?.content || "No content available")}
        </div>
      </div>
    </div>
  );
}
