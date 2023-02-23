import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BottomNav } from "~/components/bottom-nav";
import { Layout } from "~/components/layout";
import { Loading } from "~/components/loading";
import PostsList from "~/components/posts-list";
import CONFIG from "~/config";

import type Post from "~/db/models/post";
import type User from "~/db/models/user";
import { trpc } from "../utils/trpc";

export default function SearchPage(): JSX.Element {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(
    router.query.q as string
  );

  const userPayload = trpc.getUser.useQuery();
  const user = userPayload.data as User;
  const queryPosts = trpc.searchMessages.useQuery({
    search: searchQuery,
    pageIndex,
  });

  useEffect(() => {
    setSearchQuery(router.query.q as string);
  }, [router.query.q]);

  useEffect(() => {
    if (queryPosts.isSuccess) {
      setPosts(queryPosts.data as Post[]);
    }
  }, [queryPosts.data, pageIndex, searchQuery]);

  const handlePostsNavigation = (toIndex: number): void => {
    setPageIndex(toIndex);
  };

  if (userPayload.data == null) {
    return <Loading />;
  }

  return (
    <Layout username={user.username}>
      <Typography variant="h4" component="h2" sx={{ padding: 0, mb: 5 }}>
        Search results for {`"${searchQuery}"`}
      </Typography>

      {queryPosts.status === "loading" && <Loading />}

      {queryPosts.status === "success" && posts.length === 0 && (
        <Typography>No posts found for {`"${searchQuery}"`}</Typography>
      )}

      {queryPosts.status === "success" && posts.length > 0 && (
        <PostsList posts={posts} />
      )}

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
