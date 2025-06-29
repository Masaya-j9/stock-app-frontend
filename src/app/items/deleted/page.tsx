import DeletedItemsPageClient from "./DeletedItemsPageClient";
import { fetchDeletedItemList } from "@/lib/items/fetchDeletedItemList";
import { ErrorMessage } from "@/components/ErrorMessage";
import { parseApiError } from "@/utils/parses/errorParse";
import React from "react";

// クエリパラメータ型
type DeletedItemSearchProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DeletedItemsPage = async ({ searchParams }: DeletedItemSearchProps) => {
  const currentPage: number = Number(searchParams.page ?? 1);

  if (currentPage <= 0) {
    return (
      <ErrorMessage
        type="validation"
        message="ページ番号は1以上でなければなりません。"
      />
    );
  }

  try {
    const results = await fetchDeletedItemList(currentPage);
    return (
      <DeletedItemsPageClient
        initialItems={results.results}
        initialCurrentPage={currentPage}
        initialTotalPages={results.totalPages}
      />
    );
  } catch (error: any) {
    const apiError = parseApiError(error.message);
    if (apiError?.statusCode === 404) {
      return <ErrorMessage type="notFoundItem" />;
    }
    return <ErrorMessage type="network" />;
  }
};

export default DeletedItemsPage;
