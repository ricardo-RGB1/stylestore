"use client";

import Image from "next/image";
import { Product } from "../../types";
import IconButton from "../ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "../ui/currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const previewModal = usePreviewModal();
  const router = useRouter();
  const cart = useCart();

  // This function will be called when the user clicks on the product card
  const handleClick = () => {
    router.push(`/product/${data.id}`); // redirect user to the product page
  };

  // This function will be called when the user clicks on the preview or add to cart button
  const handleEventClick =
    (action: string): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.stopPropagation(); // prevent the parent div from being clicked
      switch (action) {
        case "preview":
          previewModal.onOpen(data); // open the preview modal
          break;
        case "addToCart":
          cart.addToCart(data); // add the product to the cart
          break;
        default:
          break;
      }
    };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images and actions */}
      <div className="aspect-square rounded-xl bg-gray-600 relative">
        <Image
          src={data?.images?.[0]?.url}
          alt="Image"
          fill
          className="aspect-square object-cover rounded-md"
        />
        {/* when hovering over the parent div above show the 3 icons */}
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={handleEventClick("preview")}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={handleEventClick("addToCart")}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
