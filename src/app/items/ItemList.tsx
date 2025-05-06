"use client";

import { Items as Item } from "@/types/items";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Chip,
  Box,
} from "@mui/material";
import Link from "next/link";

type ItemListProps = {
  items: Item[];
};

const ItemList = ({ items }: ItemListProps) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        アイテム一覧
      </Typography>

      {(!items || items.length === 0) ? (
        <Typography variant="body1">アイテムがありません</Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <ListItem
                key={item.id}
                divider
                component={Link}
                href={`/items/${item.id}`}
                button // ← MUIのListItemをボタンっぽくする
              >
                <ListItemText
                  primary={
                    <Box
                      component="div"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography component="span" variant="h6">
                        {item.name}
                      </Typography>
                      <Typography component="span" variant="body2">
                        在庫: {item.quantity}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box component="div">
                      <Typography
                        component="span"
                        variant="body2"
                        display="block"
                        gutterBottom
                      >
                        {item.description}
                      </Typography>
                      <Box component="div" display="flex" gap={1} flexWrap="wrap">
                        {item.itemsCategories?.map((cat) => (
                          <Chip
                            key={cat.id}
                            label={cat.name}
                            size="small"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </Box>
                  }
                  primaryTypographyProps={{ component: "div" }}
                  secondaryTypographyProps={{ component: "div" }}
                />
              </ListItem>
            ))}
          </List>

          <Box mt={4} display="flex" justifyContent="center"></Box>
        </>
      )}
    </Container>
  );
};

export default ItemList;
