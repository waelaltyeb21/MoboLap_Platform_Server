"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SelectProduct = ({ products, productKey }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState(null);

  const HandleSelectedProducts = (currentValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(productKey, currentValue._id);
    setselectedProduct(currentValue);
    setOpen(false);
    // Here is the error / i need to make this dynamic without dublicated
    return router.push(`/dashboard/compare?${params.toString()}`);
  };
  return (
    <article>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedProduct !== null
              ? products?.find((product) => {
                  return product?._id === selectedProduct?._id;
                })?.name
              : "قم بإختيار المنتج"}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن منتج" />
            <CommandList>
              <CommandEmpty>لم يتم العثور على المنتج</CommandEmpty>
              <CommandGroup>
                {products?.map((product) => (
                  <CommandItem
                    key={product?._id}
                    value={{
                      _id: product?._id,
                      name: product?.name,
                    }}
                    onSelect={() => {
                      HandleSelectedProducts({
                        _id: product?._id,
                        name: product?.name,
                      });
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedProduct?._id === product?._id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {product?.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </article>
  );
};

export default SelectProduct;
