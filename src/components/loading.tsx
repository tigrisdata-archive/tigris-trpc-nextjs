import React from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

export const Loading = (): JSX.Element => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <HourglassBottomIcon />
        <Typography>Loading...</Typography>
      </Box>
    </Container>
  );
};
