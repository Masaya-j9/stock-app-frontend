"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ItemList from "./ItemList";
import Pagination from "@/components/Pagination";
import { Items as Item } from "@/types/items";
import { Box, Container } from "@mui/material";

type ItemPageProps = {
  initialItems: Item[];
  initialCurrentPage: number;
  initialTotalPages: number;
};

const ItemsPageClient = ({
  initialItems,
  initialCurrentPage,
  initialTotalPages,
}: ItemPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  // ページが変更されたときのハンドラー
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // UIの即時反映のために状態を更新
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    // URLを更新し、サーバーコンポーネントに新しいページのデータを要求します
    router.push(`/items?${params.toString()}`);
  };

  // サーバーから渡されるページ番号が変わった場合にローカルの状態を同期
  useEffect(() => {
    setCurrentPage(initialCurrentPage);
  }, [initialCurrentPage]);

  return (
    <Container maxWidth="md">
      <ItemList items={initialItems} />
      {initialTotalPages > 1 && ( // ページが1つしかない場合はPaginationを表示しない
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            totalPages={initialTotalPages}
            currentPage={currentPage} // 現在のページ状態を使用
            onPageChange={handlePageChange} // クライアントサイドで定義したハンドラーを渡す
          />
        </Box>
      )}
    </Container>
  );
};

export default ItemsPageClient;