 import { Category } from "@/types";


const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;


/**
 * Retrieves a category by its ID.
 * @param id - The ID of the category to retrieve.
 * @returns A Promise that resolves to the retrieved category.
 */
const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`);
  const data = await res.json();
  return data;
};

export default getCategory;
