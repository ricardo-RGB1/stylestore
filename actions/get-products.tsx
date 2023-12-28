import qs from "query-string";

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean; 
}

/**
 * Retrieves products based on the provided query parameters.
 * @param query - The query parameters for filtering the products.
 * @returns A promise that resolves to an array of products.
 */
const getProducts = async (query: Query): Promise<Product[]> => {

  const url = qs.stringifyUrl({ 
    url: URL,
    query: {
      colorId: query.colorId, 
      sizeId: query.sizeId, 
      categoryId: query.categoryId,
      isFeatured: query.isFeatured
    }
  }) // url = http://localhost:4000/products?colorId=1&sizeId=1&categoryId=1&isFeatured=true

  const res = await fetch(url);
  const data = await res.json();
  return data;
};



export default getProducts;


// qs.stringifyUrl() is a function that takes an object and converts it to a query string