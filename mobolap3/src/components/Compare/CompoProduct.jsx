"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const CompoProduct = ({
  open,
  setOpen,
  data,
  id,
  product,
  HandleSelectedProduct,
  HandleRemoveProduct,
}) => {
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="lg:col-span-4">
      <div className="relative w-full lg:h-32 flex justify-center items-center border-[1.5px] border-dashed hover:border-indigo-600 rounded-lg p-4">
        {product ? (
          <h1>{product?.name}</h1>
        ) : (
          <Button
            onClick={() => setOpen((prv) => !prv)}
            className="cursor-pointer"
            variant="outline"
          >
            اضافة منتج
          </Button>
        )}
        {product && (
          <div className="absolute -top-3 -left-3">
            <X
              className="cursor-pointer text-red-700"
              onClick={() => HandleRemoveProduct(product?._id)}
            />
          </div>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>منتجات متجر موبولاب</DialogTitle>
          </DialogHeader>
          <Command dir="rtl" className="w-full">
            <CommandInput placeholder="اكتب هنا عن الحاجة البتفتش فيها ي مكتب" />
            <CommandList>
              <CommandEmpty>الحاجة البتفتش فيها دي ما موجودة هنا.</CommandEmpty>
              {data?.map((product) => (
                <CommandItem
                  key={product?._id}
                  onSelect={() => HandleSelectedProduct(product)}
                >
                  {product?.name}
                </CommandItem>
              ))}
              {/* {data?.data?.map((brand) => (
                <div key={brand?._id}>
                  <CommandGroup heading={`منتجات براند ${brand?._id}`}>
                    {brand?.products?.map((product) => (
                      <CommandItem
                        key={product?._id}
                        onSelect={() => HandleSelected(product)}
                      >
                        {product?.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </div>
              ))} */}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompoProduct;
