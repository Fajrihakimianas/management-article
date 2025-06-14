import ArticleDetail from "@/components/articles/ArticleDetail";
import Header from "@/components/layout/Header";
import React from "react";

export default async function DetailArticle({ params }) {
  const { slug } = await params;

  return (
    <>
      <Header />

      <ArticleDetail slug={slug} />
    </>
  );
}
