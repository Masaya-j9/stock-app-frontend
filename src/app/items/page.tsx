// app/items/page.tsx
import { ItemResponse } from "@/types/items";
import ItemList from "./ItemList";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchItems = async () => {
  const res = await fetch(`${API_URL}/items?pages=1&sort_order=1`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Response:", {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      body: errorText,
    });
    throw new Error(`Failed to fetch items: ${res.status} ${res.statusText}`);
  }

  const data: ItemResponse = await res.json();
  return data.results;
};

const ItemsPage = async () => {
  try {
    const items = await fetchItems();
    return <ItemList items={items} />;
  } catch (error) {
    console.error("Error in ItemsPage:", error);
    return <div>データの取得に失敗しました</div>;
  }
};
export default ItemsPage;
