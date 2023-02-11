/**
 * This is a Next.js page.
 */
import { Stack } from "@mui/material";
import { FormEvent, FormEventHandler, useState } from "react";
import PostCard from "~/components/post-card";
import Post from "~/db/models/post";
import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const user = trpc.getUser.useQuery();
  const queryPosts = trpc.getMessages.useQuery();
  const submitMessageMutation = trpc.post.useMutation();

  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>(queryPosts.data as Post[]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    const post: Post = (await submitMessageMutation.mutateAsync({
      name: user.data!.name,
      text: message,
    })) as Post;

    setPosts((prev: Post[]) => {
      return [post, ...prev];
    });
    setMessage("");
    setSubmitting(false);

    return false;
  };

  if (!user.data) {
    return (
      <div style={styles.container}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <main style={styles.main as React.CSSProperties}>
        <header>
          <h1>NVG Social</h1>
          <h2>Welcome, {user.data?.name}</h2>
        </header>

        <section>
          <form style={styles.form} onSubmit={handleSubmit}>
            <textarea
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              readOnly={submitting}
              value={message}
              style={styles.textArea as React.CSSProperties}
              required={true}
              placeholder="What's on your mind?"
            ></textarea>
            <div style={styles.actions}>
              <input
                type="submit"
                value="Post"
                disabled={submitting}
                style={styles.submitBtn}
              />
            </div>
          </form>
        </section>

        <section className="messages">
          <Stack spacing={2}>
            {posts.map((post) => {
              return <PostCard post={post} />;
            })}
          </Stack>
        </section>
      </main>
    </div>
  );
}

const fontFamily =
  "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color emoji";
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    fontFamily: fontFamily,
    fontSize: "16px",
    width: "100%",
  },

  main: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: 400,
  },

  form: {},

  textArea: {
    fontFamily: fontFamily,
    width: "100%",
    height: 18 * 5,
    fontSize: "16px",
    lineHeight: "18px",
    border: "none",
    borderBottom: "1px solid #e5e7eb",
    overflow: "auto",
    outline: "none",
    boxShadow: "none",
    resize: "none",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb",
  },

  submitBtn: {
    border: 0,
    borderRadius: 10,
    width: 75,
    height: 30,
    cursor: "pointer",
  },

  post: {
    borderRadius: "20px",
    backgroundColor: "#A6ECD9",
    padding: 10,
    margin: "10px 0",
  },

  postText: {
    margin: "10px 0",
  },

  username: {
    marginRight: 5,
    fontWeight: 600,
  },

  timestamp: {
    marginTop: 5,
    fontSize: "0.5em",
  },
};
