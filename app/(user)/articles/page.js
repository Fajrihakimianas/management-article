import ArticleList from "@/components/articles/ArticleList";
import Header from "@/components/layout/Header";
import Content from "@/components/users/Content";
import Hero from "@/components/users/Hero";
import React from "react";

export default function Articles() {
  return (
    <>
      <Header homepage />

      <Hero />

      <ArticleList />
    </>
  );
}
