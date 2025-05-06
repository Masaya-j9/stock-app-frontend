import { Items as Item } from "@/types/items"; // Item型をインポート

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchItemById = async (id: string): Promise<Item | null> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${API_URL}/items/${id}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch item: ${response.statusText}`);
    }

    const item: Item = await response.json();
    return item;
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    throw new Error("Could not fetch item data.");
  }
};