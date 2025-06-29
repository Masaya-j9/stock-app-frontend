"use client";

import React, { useState, useEffect } from "react";
import { Items, ItemResponse } from "@/types/items";
import { Container, Typography, Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { DeletedItemList } from "./DeletedItemList";
import Pagination from "@/components/Pagination";

interface DeletedItemsPageClientProps {
  initialItems: Items[];
  initialCurrentPage: number;
  initialTotalPages: number;
}

const DeletedItemsPageClient = ({
  initialItems,
  initialCurrentPage,
  initialTotalPages,
}: DeletedItemsPageClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  // ページが変更されたときのハンドラー
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/items/deleted?${params.toString()}`);
  };

  // サーバーから渡されるページ番号が変わった場合にローカルの状態を同期
  useEffect(() => {
    setCurrentPage(initialCurrentPage);
  }, [initialCurrentPage]);

  const itemResponse: ItemResponse = {
    results: initialItems,
    totalPages: initialTotalPages,
    count: initialItems.length,
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        削除済みアイテム一覧
      </Typography>
      <DeletedItemList
        items={itemResponse}
        page={currentPage}
        setPage={handlePageChange}
      />
      {itemResponse.totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            totalPages={itemResponse.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Container>
  );
};

export default DeletedItemsPageClient;
