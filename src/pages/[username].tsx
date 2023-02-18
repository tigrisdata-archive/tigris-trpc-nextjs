import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

import Post from "~/db/models/post";
import User from "~/db/models/user";

import { Container, Typography } from "@mui/material";

import { Layout } from "~/components/layout";
import PostsList from "~/components/posts-list";
import { Loading } from "~/components/loading";
import { BottomNav } from "~/components/bottom-nav";
import CONFIG from "~/config";

export default function UsernamePage() {
  const router = useRouter();
  const userPayload = trpc.getUser.useQuery();

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);

  const user: User = userPayload.data as User;
  const username = router.query.username as string;
  const queryPosts = trpc.getMessages.useQuery({
    username,
    pageIndex,
  });

  const handlePostsNavigation = (toIndex: number) => {
    setPageIndex(toIndex);
  };

  useEffect(() => {
    if (queryPosts.isSuccess) {
      setPosts(queryPosts.data as Post[]);
    }
  }, [queryPosts.data, pageIndex]);

  if (!userPayload.data) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <Typography variant="h4" component="h2" sx={{ padding: 0, mb: 5 }}>
        Posts by {username}
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
