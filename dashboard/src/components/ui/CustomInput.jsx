import React from "react";
import { Label } from "./label";
import { Input } from "./input";

const CustomInput = ({
  title = "",
  placeholder = "",
  type = "text",
  val = "",
  register = null,
  fieldKey = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Label className="font-semibold">{title}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        defaultValue={val}
        {...register(fieldKey, { required: type !== "file" ? true : false })}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
