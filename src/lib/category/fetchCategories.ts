// lib/category/fetchCategories.ts
import { CategoryResponse } from "@/types/categories";
// apiから`/categories`のデータを取得する

export const fetchCategories = async (page: number): Promise<CategoryResponse> => {
  const pageNumber = new URLSearchParams({ pages: page.toString() });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/categories?${pageNumber.toString()}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
  }

  return res.json();
};
