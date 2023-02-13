import { PropsWithChildren } from "react";

import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./app-bar";

export type LayoutProps = {
  user: { id: string; name: string };
};

export const Layout = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <Box>
      <ResponsiveAppBar username={props.user.name} />
      <Container sx={{ width: 600, p: 0, mt: 5, mb: 5 }}>
        {props.children}
      </Container>
    </Box>
  );
};
