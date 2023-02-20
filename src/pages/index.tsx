import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import React, { type FormEvent, useEffect, useState } from "react";
import { BottomNav } from "~/components/bottom-nav";
import { Layout } from "~/components/layout";
import { Loading } from "~/components/loading";
import PostsList from "~/components/posts-list";
import CONFIG from "~/config";

import type Post from "~/db/models/post";
import type User from "~/db/models/user";
import { trpc } from "../utils/trpc";

export default function IndexPage(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const userPayload = trpc.getUser.useQuery();
  const user = userPayload.data as User;
  const queryPosts = trpc.getMessages.useQuery({ pageIndex });
  const submitMessageMutation = trpc.post.useMutation();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (queryPosts.isSuccess) {
      setPosts(queryPosts.data as Post[]);
    }
  }, [queryPosts.data, pageIndex]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setSubmitting(true);
    const post: Post = (await submitMessageMutation.mutateAsync({
      text: message,
    })) as Post;

    setPosts((prev: Post[]) => {
      return [post, ...prev];
    });
    setMessage("");
    setSubmitting(false);
  };

  const handlePostsNavigation = (toIndex: number): void => {
    setPageIndex(toIndex);
  };

  if (userPayload.data === undefined) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <Typography variant="h4" component="h2">
        Welcome, {user.username}
      </Typography>

      <Box id="middle" sx={{ padding: 0, mt: 5, mb: 5 }}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            id="message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            readOnly={submitting}
            value={message}
            style={styles.textArea as React.CSSProperties}
            required={true}
            placeholder="What's on your mind?"
          ></TextareaAutosize>
          <Box
            id="actions"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              type="submit"
              value="Post"
              disabled={submitting}
            >
              Post
            </Button>
          </Box>
        </form>
      </Box>

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

const fontFamily =
  "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color emoji";
const styles = {
  textArea: {
    fontFamily,
    width: "100%",
    height: 22 * 4,
    fontSize: "16px",
    lineHeight: "22px",
    border: "none",
    borderBottom: "1px solid #e5e7eb",
    overflow: "auto",
    outline: "none",
    boxShadow: "none",
    resize: "none",
  },
};
