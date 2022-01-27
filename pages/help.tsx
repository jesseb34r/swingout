import * as React from "react";
import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";

import MyNavBar from "@swingout/components/MyNavBar";
import MyFooter from "@swingout/components/MyFooter";

const Help: NextPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <MyNavBar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(white, hsl(210, 75%, 75%))",
        }}
      >
        <Typography sx={{ mb: "20px" }} variant="h1" color="primary">
          Help
        </Typography>
      </Box>
      <MyFooter />
    </Box>
  );
};

export default Help;
