import { PropsWithChildren } from "react";

import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./app-bar";
import User from "~/db/models/user";
import Head from "next/head";

export type LayoutProps = {
  user: User;
};

export const Layout = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Box>
        <ResponsiveAppBar username={props.user.username} />
        <Container sx={{ width: 600, p: 0, mt: 5, mb: 5, pb: 5 }}>
          {props.children}
        </Container>
      </Box>
    </>
  );
};
