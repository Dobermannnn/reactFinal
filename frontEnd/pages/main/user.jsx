import react from "react";
import LogIn from "../../components/logIn";
import Post from "../../components/Post";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CreatePost from "../../components/createPost";
import Comment from "../../components/comment";
export default function MainPage() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const router = useRouter();
  const {
    query: { name, _id },
  } = router;

  const [posts, setPosts] = useState();

  const buttonStyle = {
    alignItems: "center",
    backgroundClip: "padding-box",
    backgroundColor: "#6962AD",
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

  const getAllPostByConnectedUser = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/post/byUser/${name}`
    );
    clearBoard();
    setPosts(res.data);
    setIsCreatingPost(false);
    //router.query.userName
  };

  const getAllPosts = async () => {
    const res = await axios.get(`http://localhost:3000/api/post/`);
    clearBoard();
    console.log(res.data);
    setPosts(res.data);
    setIsCreatingPost(false);
    //router.query.userName
  };
  const clearBoard = () => {
    setPosts([]);
    setIsCreatingPost(true);
  };
  const logOut = async () => {
    window.location.href = "http://localhost:3001/LogInPage";
    //router.query.userName
  };

  const searchByTopic = async () => {
    console.log(searchBar.trim());
    if (searchBar.trim().length > 0) {
      const res = await axios.get(
        `http://localhost:3000/api/post/byTopic/${searchBar}`
      );
      console.log(res.data);
      setPosts(res.data);

      setIsCreatingPost(false);
      setSearchBar("");
    }
  };

  return (
    <>
      <style>
        {`
          body {
            font-family: system-ui;
            background: #83C0C1;
            color: white;
          }
        `}
      </style>
      <h1 style={{ fontFamily: "system-ui" }}>Logged in as: {name}</h1>
      <button style={buttonStyle} onClick={logOut}>
        log out
      </button>

      <h2>search by Topic</h2>
      <input
        type="text"
        value={searchBar}
        onChange={(event) => setSearchBar(event.target.value)}
      />
      <br />

      <button style={buttonStyle} onClick={searchByTopic}>
        Search
      </button>
      <center>
        <button onClick={clearBoard} style={buttonStyle}>
          create Post
        </button>
        <button onClick={getAllPostByConnectedUser} style={buttonStyle}>
          Your Posts
        </button>
        <button onClick={getAllPosts} style={buttonStyle}>
          All Posts
        </button>
      </center>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {posts != null &&
          posts.map((p) => (
            <Post
              topic={p.topic}
              content={p.content}
              postId={p.id}
              isOwner={p.creatorId == _id || name == "admin"}
              creatorId={p.creatorId}
              currentName={name}
              currentId={_id}
              name={p.creatorName}
              firstComment={p.firstComment}
              amountOfComments={p.totalComments}
            />
          ))}
      </div>

      {isCreatingPost && <CreatePost _id={_id} name={name} />}
    </>
  );
}
