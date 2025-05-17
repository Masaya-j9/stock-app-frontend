// app/items/page.tsx
import ItemsPageClient from "@/app/items/ItemsPageClient";
import { fetchItems } from "@/lib/items/fetchItems";
import { ErrorMessage } from "@/components/ErrorMessage";
import { parseApiError } from "@/utils/parses/errorParse";
import React from "react";

type ItemSearchProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ItemsPage = async ({ searchParams }: ItemSearchProps) => {
  console.log("searchParams:", searchParams);
  const currentPage: number = Number(searchParams.pages ?? 1);
  console.log("currentPage:", currentPage);

  if (currentPage <= 0) {
    return <ErrorMessage type="validation" message="ページ番号は1以上でなければなりません。" />;
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
  } catch (error: any) {
    const apiError = parseApiError(error.message);
    console.error("APIエラー:", apiError);

    if (apiError?.statusCode === 404) {
      return <ErrorMessage type="notFoundItem" />;
    }
    return <ErrorMessage type="network" />;
  }
};

export default ItemsPage;
