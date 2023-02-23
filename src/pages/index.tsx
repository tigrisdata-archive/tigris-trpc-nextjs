import React from "react";
import { Typography } from "@mui/material";
import { Layout } from "~/components/layout";
import { Loading } from "~/components/loading";

import { trpc } from "../utils/trpc";

export default function IndexPage(): JSX.Element {
  const userPayload = trpc.getUser.useQuery();

  if (userPayload.data === undefined) {
    return <Loading />;
  }

  const user = userPayload.data as { username: string };

  return (
    <Layout username={user.username}>
      <Typography variant="h4" component="h2" mb={5}>
        Welcome, {user.username}
      </Typography>
    </Layout>
  );
}
