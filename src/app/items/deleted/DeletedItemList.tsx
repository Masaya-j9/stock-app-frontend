"use client";

import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { ItemResponse } from "@/types/items";

type Props = {
  items: ItemResponse;
  page: number;
  setPage: (page: number) => void;
};

export const DeletedItemList: React.FC<Props> = ({ items }) => (
  <List>
    {items.results.length === 0 ? (
      <ListItem>
        <Typography variant="body1">
          論理削除済みアイテムはありません。
        </Typography>
      </ListItem>
    ) : (
      items.results.map((item) => (
        <ListItem key={item.id} divider>
          <ListItemText
            primary={
              <Box display="flex" justifyContent="space-between">
                <Typography component="span" variant="h6">
                  {item.name}
                </Typography>
                <Typography component="span" variant="body2">
                  在庫: {item.quantity ?? "-"}
                </Typography>
              </Box>
            }
            secondary={
              <Box>
                <Typography
                  component="span"
                  variant="body2"
                  display="block"
                  gutterBottom
                >
                  {item.description}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {item.itemsCategories && item.itemsCategories.length > 0 ? (
                    item.itemsCategories.map((cat) => (
                      <Chip
                        key={cat.id}
                        label={cat.name}
                        size="small"
                        color="primary"
                      />
                    ))
                  ) : (
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      カテゴリー: -
                    </Typography>
                  )}
                </Box>
              </Box>
            }
            primaryTypographyProps={{ component: "div" }}
            secondaryTypographyProps={{ component: "div" }}
          />
        </ListItem>
      ))
    )}
  </List>
);
