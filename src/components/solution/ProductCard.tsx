import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";

export interface ProductItem {
  id: string;
  category: string;
  name: string;
  assetKey: string;
  learnMoreUrl: string;
  docUrl: string;
}

export interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between items-center text-center">
      {/* Product Image */}
      <div className="w-full h-[220px] sm:h-[240px] relative mb-6 flex items-center justify-center p-4">
        <SmartImage
          assetKey={product.assetKey}
          width={260}
          height={260}
          className="max-h-full w-auto object-contain"
          alt={product.name}
        />
      </div>

      {/* Category & Title */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#fe7900] mb-2 block">
          {product.category}
        </span>
        <h3 className="text-lg sm:text-xl font-medium text-neutral-900 leading-snug">
          {product.name}
        </h3>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Button
          href={product.learnMoreUrl}
          isExternal={true}
          variant="outline-grey"
          size="sm"
          className="w-full"
        >
          Learn More
        </Button>
        <Button
          href={product.docUrl}
          isExternal={true}
          variant="outline-grey"
          size="sm"
          className="w-full text-[11px]"
        >
          Documents & Installation
        </Button>
      </div>
    </div>
  );
}
