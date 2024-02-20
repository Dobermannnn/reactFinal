import axios from "axios";
import { useState, useEffect } from "react";
export default function Comment({
  content,
  creatorName,
  currentName,
  commentId,
}) {
  const buttonStyle = {
    alignItems: "center",
    backgroundClip: "padding-box",
    backgroundColor: "#749BC2",
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

  const deleteComment = async () => {
    console.log("coomentId" + commentId);
    const res = await axios.delete(
      `http://localhost:3000/api/comment/${commentId}`
    );
    alert("comment deleted");
  };

  return (
    <>
      <div
        style={{
          fontFamily: "system-ui",
          width: "30%",
          float: "left",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#4682A9",
          minHeight: "120px",
          margin: "0 1% 1% 0",
          padding: "16px",
          boxSizing: "border-box",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          color: "#fff",
        }}
      >
        <h4
          style={{
            margin: "0",
            fontSize: "1.2em",
            color: "#eee",
            marginBottom: "8px",
          }}
        >
          {creatorName} :
        </h4>
        <p
          style={{
            display: "block",
            whiteSpace: "normal",
            wordWrap: "break-word",
            width: "100px",
            position: "relative",
          }}
        >
          {content}
        </p>
        {currentName === "admin" && (
          <button
            style={{
              ...buttonStyle,
              position: "absolute",
              bottom: "8px",
              right: "8px",
            }}
            onClick={deleteComment}
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
}
