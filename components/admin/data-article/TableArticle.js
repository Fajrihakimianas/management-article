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

export default function TableArticle() {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="border overflow-hidden border-slate-200 bg-white rounded-md">
      <div className="border-b bg-gray-50">
        <h2 className="text-sm font-medium p-4">Total Articles : 25</h2>
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
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Created at</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium text-center">
                {invoice.invoice}
              </TableCell>
              <TableCell className="text-center">
                {invoice.paymentStatus}
              </TableCell>
              <TableCell className="text-center">
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-center">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
