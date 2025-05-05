import { ItemResponse } from "@/types/items";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchItems = async (page: number): Promise<ItemResponse> => {
  const res = await fetch(`${API_URL}/items?pages=${page}&sort_order=1`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch items: ${res.status} ${res.statusText}\n${errorText}`);
  }

  return res.json();
};
