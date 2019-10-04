import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { Post } from "../../api";

type PostsProps = {
  posts: Post[];
  type: string;
  editPost: (type: string, id: number, value: string) => void;
  deletePost: (type: string, id: number) => void;
};

export default function PostsList(props: PostsProps) {
  const { posts, editPost, deletePost, type } = props;
  const [editState, setEditState] = React.useState(0);
  const [postBuffer, setPostBuffer] = React.useState("");

  const editClick = (postID: number) => {
    editPost(type, postID, postBuffer);
    return setEditState(0);
  };
  React.useEffect(() => {
    if (editState > 0) {
      setPostBuffer(posts.find(post => post.id === editState)!.content);
    }
  }, [editState]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {posts.map(post => (
        <div
          key={post.id}
          style={{
            backgroundColor: "lightgrey",
            padding: "20px",
            margin: "20px",
            width: "200px",
            borderRadius: "5px"
          }}
        >
          <h3>{post.id}</h3>
          {editState === post.id ? (
            <TextField
              multiline
              value={postBuffer}
              onChange={e => setPostBuffer(e.target.value)}
            />
          ) : (
            <p>{post.content}</p>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {editState === post.id ? (
              <>
                <CheckCircleIcon
                  onClick={() => editClick(post.id)}
                  style={{ cursor: "pointer", marginRight: "15px" }}
                />
                <CancelIcon
                  onClick={() => setEditState(0)}
                  style={{ cursor: "pointer", marginRight: "15px" }}
                />
              </>
            ) : (
              <EditIcon
                onClick={() => setEditState(post.id)}
                style={{ cursor: "pointer", marginRight: "15px" }}
              />
            )}
            <DeleteIcon
              onClick={() => deletePost(type, post.id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
