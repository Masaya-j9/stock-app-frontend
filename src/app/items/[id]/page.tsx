'use client';

import { fetchItemById } from "@/lib/items/fetchItem";
import { ErrorMessage } from "@/components/ErrorMessage";
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
      </Box>
    </Container>
  );
}
