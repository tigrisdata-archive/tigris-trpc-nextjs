import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BottomNav } from "~/components/bottom-nav";
import { Layout } from "~/components/layout";
import { Loading } from "~/components/loading";
import PostsList from "~/components/posts-list";

import Post from "~/db/models/post";
import User from "~/db/models/user";
import { trpc } from "../utils/trpc";

export default function SearchPage() {
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

  const handlePostsNavigation = (toIndex: number) => {
    setPageIndex(toIndex);
  };

  if (!userPayload.data) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <Typography variant="h4" component="h2" sx={{ padding: 0, mb: 5 }}>
        Search results for {`"${searchQuery}"`}
      </Typography>

      <PostsList posts={posts} />
      <BottomNav
        pageIndex={pageIndex}
        handlePostsNavigation={handlePostsNavigation}
      />
    </Layout>
  );
}
