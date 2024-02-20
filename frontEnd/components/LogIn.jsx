import axios from "axios";
import { useState } from "react";
import Router, { useRouter } from "next/router";
export default function LogIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const divStyle = {
    fontFamily: "system-ui",
    background: "#F6F4EB",
    color: "black",
    textAlign: "center",

    padding: "20px", // Adjust padding as needed
  };
  const buttonStyle = {
    alignItems: "center",
    backgroundClip: "padding-box",
    backgroundColor: "#4682A9",
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
  const router = useRouter();
  const Submit = async () => {
    // http request using name and password from state
    if (name != "" && password != "") {
      try {
        const res = await axios.post("http://localhost:3000/api/user/Login", {
          name,
          password,
        });
        if (res.data != null) {
          Router.push({
            pathname: `main/user`,
            query: {
              name: res.data.name,
              _id: res.data._id,
            },
          });
        }
      } catch (err) {
        console.log("didnt find user");
      }
    }
  };

  return (
    <>
      <style>
        {`
          body {
            font-family: system-ui;
            background: #F6F4EB;
            color: white;
            text-align: center;
          }
        `}
      </style>
      <div style={divStyle}>
        <center>
          <div>
            <h1>Log In</h1>
            <h3>user name</h3>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              style={{ fontSize: "18px" }}
            />
            <h3>password</h3>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ fontSize: "18px" }}
            />
            <br />
            <button onClick={Submit} style={buttonStyle}>
              Submit
            </button>
          </div>
          <h4>
            Incase you dont have an account,
            <a href="http://localhost:3001/SignInPage">Sign Up</a>
          </h4>
        </center>
      </div>
    </>
  );
}
