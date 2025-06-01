"use client";

import { fetchItemById } from "@/lib/items/fetchItem";
import { deleteItem } from "@/lib/items/deleteItem";
import { ErrorMessage } from "@/components/ErrorMessage";
import { DeleteConfirmModal } from "@/components/Modals/DeleteConfirmModal";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

type Params = {
  params: {
    id: string;
  };
};

export default function ItemDetailPageWrapper({ params }: Params) {
  const [item, setItem] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null); // 追加

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchItemById(params.id);
      setItem(data);
    };
    fetch();
  }, [params.id]);

  const router = useRouter();

  const handleEditClick = useCallback(() => {
    if (!item) return;
    localStorage.setItem("editingItem", JSON.stringify(item));
    router.push(`/items/${params.id}/edit`);
  }, [item, params.id, router]);

  const handleDelete = async () => {
    try {
      await deleteItem(params.id);
      setItem(null);
      router.push("/items");
    } catch (error: any) {
      setDeleteError(error?.message || "削除に失敗しました"); // エラーセット
      console.error("削除に失敗しました:", error);
    }
  };

  if (!item) {
    return <ErrorMessage type="notFoundItem" />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {item.name}
      </Typography>

      <Typography variant="body1" paragraph>
        {item.description}
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        在庫: {item.quantity}
      </Typography>

      <Typography variant="h6" gutterBottom>
        カテゴリ一覧
      </Typography>

      <List>
        {item.itemCategories?.map((cat: any) => (
          <React.Fragment key={cat.id}>
            <ListItem disablePadding>
              <ListItemText primary={cat.name} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          編集する
        </Button>
        <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
          削除する
        </Button>
      </Box>

      <DeleteConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="削除の確認"
        description="このアイテムを削除しますか？"
        errorMessage={deleteError}
      />
    </Container>
  );
}
