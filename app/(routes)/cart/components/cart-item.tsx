"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemProps {
  item: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {

    const cart = useCart(); // get the cart object from the useCart hook

    const onRemove = () => {
        cart.removeFromCart(item.id); // remove the item from the cart
    }



  return (
    <li className="flex py-6 border-b">
      {/* Image */}
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={item.images[0].url}
          alt="Product Image"
          className="object-cover object-center"
        />
      </div>
    {/* Product Details */}
      <div className="flex-auto space-y-1 pl-9">
        <h3 className="text-lg font-semibold text-black">{item.name}</h3>
        <p className="text-sm text-neutral-500">Color: {item.color.name}</p>
        <p className="text-sm text-neutral-500">Size: {item.size.value}</p>
      </div>

    {/* Actions and Price */}
      <div className="flex-col space-y-10 sm:space-y-32 ">
        <IconButton
          onClick={onRemove}
          icon={<X size={16} />}
        />
         <Currency value={item.price}/>
      </div>
    </li>
  );
};

export default CartItem;

