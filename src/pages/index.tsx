import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BottomNav } from "~/components/bottom-nav";
import { Layout } from "~/components/layout";
import { Loading } from "~/components/loading";
import PostsList from "~/components/posts-list";
import CONFIG from "~/config";

import type Post from "~/db/models/post";
import type User from "~/db/models/user";
import { trpc } from "../utils/trpc";

export default function IndexPage(): JSX.Element {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const userPayload = trpc.getUser.useQuery();
  const user = userPayload.data as User;
  const queryPosts = trpc.getMessages.useQuery({ pageIndex });

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (queryPosts.isSuccess) {
      setPosts(queryPosts.data as Post[]);
    }
  }, [queryPosts.data, pageIndex]);

  const handlePostsNavigation = (toIndex: number): void => {
    setPageIndex(toIndex);
  };

  if (userPayload.data === undefined) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <Typography variant="h4" component="h2" mb={5}>
        Welcome, {user.username}
      </Typography>

      {queryPosts.status === "loading" && <Loading />}

      {queryPosts.status === "success" && <PostsList posts={posts} />}

      <BottomNav
        pageIndex={pageIndex}
        showNewerButton={pageIndex > 0}
        showOlderButton={
          posts.length > 0 && posts.length === CONFIG.DEFAULT_PAGING_SIZE
        }
        handlePostsNavigation={handlePostsNavigation}
      />
    </Layout>
  );
}
