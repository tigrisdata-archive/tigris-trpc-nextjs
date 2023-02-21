import React from "react";
import { Typography } from "@mui/material";
import { Layout } from "~/components/layout";
import { Loading } from "~/components/loading";

import type User from "~/db/models/user";
import { trpc } from "../utils/trpc";

export default function IndexPage(): JSX.Element {
  const userPayload = trpc.getUser.useQuery();
  const user = userPayload.data as User;

  if (userPayload.data === undefined) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <Typography variant="h4" component="h2" mb={5}>
        Welcome, {user.username}
      </Typography>
    </Layout>
  );
}
