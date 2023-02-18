import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

export const Loading = () => {
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
