/**
 * This is a Next.js page.
 */
import { FormEvent, FormEventHandler, useState } from "react";
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
    setSubmitting(true);
    const post = await submitMessageMutation.mutate({
      name: user.data!.name,
      text: message,
    });
    // setPosts((prev) => [...prev, post]);
    setMessage("");
    setSubmitting(false);
    console.log("handleSubmit");
    e.preventDefault();
  };

  if (!user.data) {
    return (
      <div style={styles}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div style={styles}>
      <h1>NVG Social</h1>
      <h2>{`${user.data?.id}: ${user.data?.name}`}</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          id="message"
          onChange={(e) => setMessage(e.target.value)}
          readOnly={submitting}
          value={message}
        ></textarea>
        <input type="submit" value="Post" disabled={submitting} />
      </form>

      <section className="messages">
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <span>{post.name}:</span>
              <span>{post.text}</span>
            </div>
          );
        })}
      </section>
    </div>
  );
}

const styles = {
  width: "100vw",
  height: "100vh",
};
