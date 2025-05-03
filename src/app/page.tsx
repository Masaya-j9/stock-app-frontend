import React from "react";
import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h1">Hello World</Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
}
