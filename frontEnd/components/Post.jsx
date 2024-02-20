import axios from "axios";
import { useState, useEffect } from "react";
import Comment from "./comment";
export default function Post({
  topic,
  content,
  postId,
  isOwner,
  creatorId,
  currentName,
  currentId,
  name,
  firstComment,
  amountOfComments,
}) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const buttonStyle = {
    alignItems: "center",
    backgroundClip: "padding-box",
    backgroundColor: "#91C8E4",
    border: "1px solid transparent",
    borderRadius: ".25rem",
    boxShadow: "rgba(0, 0, 0, 0.02) 0 1px 3px 0",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    display: "inline-flex",
    fontFamily:
      'system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: "16px",
    fontWeight: "600",
    justifyContent: "center",
    lineHeight: "1.25",
    margin: "0",
    minHeight: "3rem",
    padding: "calc(.875rem - 1px) calc(1.5rem - 1px)",
    position: "relative",
    textDecoration: "none",
    transition: "all 250ms",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    verticalAlign: "baseline",
    width: "auto",
  };

  const shortTextStyle = {
    display: "block",
    width: "70%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    position: "relative",
  };
  const longTextStyle = {
    display: "block",
    width: "100%",
    whiteSpace: "normal",
    wordWrap: "break-word",
    width: "500px",
    position: "relative",
  };
  const [textStyle, setTextStyle] = useState(shortTextStyle);
  console.log(textStyle);
  console.log(shortTextStyle);
  const showComments = async () => {
    const res = await axios.get(`http://localhost:3000/api/comment/${postId}`);

    setAllComments(res.data);
    if (res.data.length == 0) {
      alert("no comments for this post");
    }
  };
  const showLess = () => {
    setAllComments(allComments.slice(0, 1));
  };
  const showMoreContent = () => {
    setTextStyle(longTextStyle);
  };
  const showLessContent = () => {
    setTextStyle(shortTextStyle);
  };
  const addComment = async () => {
    if (comment != "") {
      const res = await axios.post(`http://localhost:3000/api/comment`, {
        content: comment,
        creatorName: currentName,
        postId: postId,
        creatorId: currentId,
      });
      alert("comment added");
      setAllComments((allComments) => [...allComments, , res.data]);
      setComment("");
    }
  };

  const deletePost = async () => {
    const res = await axios.delete(`http://localhost:3000/api/post/${postId}`);
    alert("post deleted");
  };
  return (
    <>
      <div
        style={{
          fontFamily: "system-ui",
          width: "32%",
          float: "left",
          border: "1px solid transparent",
          borderRadius: ".25rem",
          backgroundColor: "#749BC2",
          minHeight: "100px", // Set a minimum height for each post
          margin: "0 1% 1% 0",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px 0px",
        }}
      >
        {isOwner && (
          <button
            style={{ ...buttonStyle, float: "right", top: "0" }}
            onClick={deletePost}
          >
            {" "}
            Delete
          </button>
        )}
        {JSON.stringify(textStyle) === JSON.stringify(shortTextStyle) &&
          content.length > 30 && (
            <button
              style={{ ...buttonStyle, float: "right", top: "0" }}
              onClick={showMoreContent}
            >
              show more
            </button>
          )}
        {JSON.stringify(textStyle) === JSON.stringify(longTextStyle) && (
          <button
            style={{ ...buttonStyle, float: "right", top: "0" }}
            onClick={showLessContent}
          >
            show less
          </button>
        )}

        <h3>
          Made By: {name} <br />
          Topic: {topic}
        </h3>
        <p style={textStyle}>Content: {content}</p>
        {allComments.length < 2 && amountOfComments >= 2 && (
          <button onClick={showComments} style={buttonStyle}>
            Show more comments
          </button>
        )}
        {firstComment && allComments.length < 2 && (
          <Comment
            content={firstComment.content}
            postId={postId}
            commentId={firstComment._id}
            creatorId={firstComment.creatorId}
            creatorName={firstComment.creatorName}
            currentName={currentName}
          />
        )}

        {allComments.length > 1 && (
          <>
            <button onClick={showLess} style={buttonStyle}>
              Show Less
            </button>
            {allComments.map((c) => (
              <Comment
                key={c.id}
                content={c.content}
                postId={postId}
                commentId={c._id}
                creatorId={c.creatorId}
                creatorName={c.creatorName}
                currentName={currentName}
              />
            ))}
          </>
        )}

        <br />

        <div style={{ float: "right", top: "0" }}>
          <button onClick={addComment} style={buttonStyle}>
            Add Comment
          </button>
          <br />
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>
      </div>
    </>
  );
}
