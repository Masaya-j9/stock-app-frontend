import { ItemResponse } from "@/types/items";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDeletedItemList = async (
  page: number = 1,
  sortOrder: number = 0
): Promise<ItemResponse> => {
  const params = new URLSearchParams({
    pages: String(page),
    sort_order: String(sortOrder),
  });
  const res = await fetch(`${API_URL}/items/deleted?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    let message = "論理削除済みアイテムの取得に失敗しました";
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
};
