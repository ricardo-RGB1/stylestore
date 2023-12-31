import { Product } from "@/types";


const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

/**
 * Retrieves a Product by its ID from the API.
 * @param id - The ID of the Product to retrieve.
 * @returns A Promise that resolves to the retrieved Product.
 */
const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`); // http://localhost:4000/products/1
  const data = await res.json();
  return data;
};

export default getProduct;
