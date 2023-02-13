import { Box, Stack, Typography } from "@mui/material";
import PostCard from "~/components/post-card";
import Post from "~/db/models/post";

export default function PostsList({ posts }: { posts: Post[] }) {
  return (
    <Box id="posts">
      <Stack spacing={2}>
        {posts.length === 0 && <Typography>No posts yet!</Typography>}
        {posts.length > 0 &&
          posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
      </Stack>
    </Box>
  );
}