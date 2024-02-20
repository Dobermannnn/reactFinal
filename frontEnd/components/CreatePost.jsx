import react from "react";

import LogIn from "./logIn";
import axios from "axios";
import { useState } from "react";
export default function CreatePost({ _id, name }) {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const formStyle = {
    fontFamily: "system-ui",
    textAlign: "center",
    marginTop: "50px",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const labelStyle = {
    fontFamily: "system-ui",
    fontSize: "24px",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "20px",
    boxSizing: "border-box",
    marginBottom: "15px",
    fontFamily: "system-ui",
  };
  const buttonStyle = {
    alignItems: "center",
    backgroundClip: "padding-box",
    backgroundColor: "#fa6400",
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

  const newPost = async () => {
    if (_id != "" && topic != "" && content != "") {
      const res = await axios.post("http://localhost:3000/api/post", {
        creatorId: _id,
        creatorName: name,
        topic,
        content,
      });
      alert("post added");
    }
  };

  return (
    <>
      <div style={formStyle}>
        <label style={labelStyle}>Topic:</label>
        <input
          type="text"
          id="TopicInput"
          name="TopicInput"
          style={inputStyle}
          value={topic}
          onChange={handleTopicChange}
        />

        <label style={labelStyle}>Content:</label>
        <input
          type="text"
          id="ContentInput"
          name="ContentInput"
          style={{ ...inputStyle, height: "100px" }}
          value={content}
          onChange={handleContentChange}
        />

        <button style={buttonStyle} onClick={newPost}>
          Submit
        </button>
      </div>
    </>
  );
}
