"use client";
import React from "react";
import { Button } from "../ui/button";
import { GitCompareArrows, ShoppingBag } from "lucide-react";

export const AddToCompare = () => {
  return (
    <Button className="w-full cursor-pointer" variant="outline">
      <span>اضافة للمقارنة</span>
      <GitCompareArrows />
    </Button>
  );
};

export const AddToCart = () => {
  return (
    <Button className="w-full cursor-pointer bg-indigo-700 text-slate-100">
      <span>اضافة للسلة</span>
      <ShoppingBag />
    </Button>
  );
};
