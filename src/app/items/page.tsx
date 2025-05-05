// app/items/page.tsx
import ItemsPageClient from "@/app/items/ItemsPageClient";
import { fetchItems } from "@/lib/fetchItems";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ItemsPage = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams.page ?? 0);

  if (currentPage <= 0) {
    return <div>ページ番号は1以上でなければなりません</div>;
  }


  try {
    const { results, totalPages } = await fetchItems(currentPage);
    return (
      <ItemsPageClient
        initialItems={results}
        initialCurrentPage={currentPage}
        initialTotalPages={totalPages}
      />
    );
  } catch (error) {
    console.error("Error in ItemsPage:", error);
    return <div>データの取得に失敗しました</div>;
  }
};

export default ItemsPage;