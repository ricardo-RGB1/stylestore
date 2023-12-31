import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

/**
 * Gets all categories from the API.
 * @returns An array of categories.
 */
const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);
  return res.json();
};

export default getCategories;
