"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            <Button color="inherit" component={Link} href="/">
              在庫管理アプリ
            </Button>
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit">ログイン</Button>
            <Button color="inherit">新規登録</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
