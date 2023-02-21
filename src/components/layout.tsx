import React, { type PropsWithChildren } from "react";
import { Box, Container } from "@mui/material";
import ResponsiveAppBar from "./app-bar";
import Head from "next/head";

export interface LayoutProps {
  username: string;
}

export const Layout = (props: PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Box>
        <ResponsiveAppBar username={props.username} />
        <Container sx={{ width: 600, p: 0, mt: 5, mb: 5, pb: 5 }}>
          {props.children}
        </Container>
      </Box>
    </>
  );
};
