import { Box, Stack } from "@mui/material";
import PostCard from "~/components/post-card";
import Post from "~/db/models/post";

export default function PostsList({ posts }: { posts: Post[] }) {
  return (
    <Box id="posts">
      <Stack spacing={2}>
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </Stack>
    </Box>
  );
}
