"use client";
import React from "react";
import { Label } from "./label";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const CustomSelect = ({
  title = "",
  placeholder = "",
  name = "",
  control = null,
  handler = null,
  val = "",
  items = [],
  fieldKey = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Label className="font-semibold">{title}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            dir="rtl"
            defaultValue={val}
            onValueChange={
              handler
                ? (val) => {
                    handler(val);
                    field.onChange(val);
                  }
                : field.onChange
            }
            {...props}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="capitalize">
              {items?.map((item) => (
                <SelectItem
                  value={item?._id ? item?._id : item?.value}
                  key={item?._id ? item?._id : item?.value}
                >
                  {item[fieldKey]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default CustomSelect;
