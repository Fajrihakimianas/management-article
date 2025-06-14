/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useArticlesStore } from "@/stores";
import { toast } from "sonner";
import PaginationComponent from "@/components/pagination/Pagination";

export default function TableArticle() {
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
    <div className="border overflow-hidden border-slate-200 bg-white rounded-md">
      <div className="border-b bg-gray-50">
        <h2 className="text-sm font-medium p-4">
          Total Articles : {totalArticles}
        </h2>
      </div>

      <div className="border-b bg-gray-50 flex p-4 gap-2">
        <Select>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
        </Select>

        <Input
          type="search"
          placeholder="Search by title"
          className="w-full max-w-xs mr-auto"
        />

        <Button className="bg-blue-600 font-normal text-white">
          <Plus className="h-4 w-4" /> Add Article
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-slate-200/60">
          <TableRow>
            <TableHead className="text-center">Thumbnails</TableHead>
            <TableHead className="text-center w-28">Title</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Created at</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="py-5 font-medium text-center">
                Gambar
              </TableCell>
              <TableCell className="py-5 font-light text-sm text-start">
                {item.title}
              </TableCell>
              <TableCell className="py-5 font-light text-sm text-center">
                {item.category?.name || "Uncategorized"}
              </TableCell>
              <TableCell className="py-5 font-light text-sm text-center">
                {new Date(item?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-5 border-t">
        {totalArticles > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
