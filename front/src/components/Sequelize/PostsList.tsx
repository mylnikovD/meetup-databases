import React from "react";
import { Post } from "../../api";

type PostsProps = {
  posts: Post[];
};

export default function PostsList(props: PostsProps) {
  const { posts } = props;
  return (
    <div style={{ display: "flex", flexWrap: 'wrap' }}>
      {posts.map(post => (
        <div
          style={{
            backgroundColor: "lightgrey",
            padding: "20px",
            margin: "20px",
            width: '200px',
            borderRadius: '5px'
          }}
        >
          <h3>{post.id}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
