"use client";

import { Category } from "@/types/categories";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";

type Props = {
  categories: Category[];
};

const CategoryList = ({ categories }: Props) => {
  if (!categories || categories.length === 0) {
    return <Typography variant="body1">カテゴリがありません</Typography>;
  }

  return (
    <List>
      {categories.map((category) => (
        <ListItem
          key={category.id}
          divider
          component={Link}
          href={`/categories/${category.id}`}
          button
        >
          <ListItemText
            primary={
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{category.name}</Typography>
                <Typography variant="body2">
                  更新日：{new Date(category.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            }
            secondary={
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            }
            primaryTypographyProps={{ component: "div" }}
            secondaryTypographyProps={{ component: "div" }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;