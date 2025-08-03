"use client";

import React, { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AnimatedNumberCounter({
  num = 1,
  id,
  IncreaseQuantity,
  DecreaseQuantity,
}) {
  const [count, setCount] = useState(num);
  const [activeButton, setActiveButton] = useState(null);
  const [flashColor, setFlashColor] = useState(null);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    setActiveButton("up");
    IncreaseQuantity(id);
    // setFlashColor("up");
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prev) => (prev > 1 ? prev - 1 : prev));
      setActiveButton("down");
      DecreaseQuantity(id);
    }
    // setFlashColor("down");
  };

  useEffect(() => {
    if (flashColor) {
      const timer = setTimeout(() => {
        setFlashColor(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flashColor]);

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl  transition-colors duration-300 ${
        flashColor === "up"
          ? " text-green-500 "
          : flashColor === "down"
          ? "text-red-500"
          : ""
      }`}
    >
      <button
        onClick={handleIncrement}
        className="flex size-6 items-center justify-center rounded-md "
      >
        <ChevronUp
          className={`size-6 transition-colors duration-300 ${
            activeButton === "up" ? "text-green-500" : "text-gray-600"
          }`}
        />
      </button>
      <NumberFlow
        value={count}
        className="text-xl w-14 text-center font-semibold"
      />
      <button
        onClick={handleDecrement}
        className="flex size-12 items-center justify-center rounded-md"
      >
        <ChevronDown
          className={`size-6 transition-colors duration-300 ${
            activeButton === "down" ? "text-red-500" : "text-gray-600"
          }`}
        />
      </button>
    </div>
  );
}
