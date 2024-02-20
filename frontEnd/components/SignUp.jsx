import react from "react";

import LogIn from "./logIn";
import axios from "axios";
import { useState } from "react";
export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const divStyle = {
    fontFamily: "system-ui",
    background: "#FFC300",
    color: "black",
    textAlign: "center",

    padding: "20px", // Adjust padding as needed
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

  const Submit = async () => {
    // http request using name and password from state
    if (name != "" && password != "") {
      const res = await axios.post("http://localhost:3000/api/user/", {
        name,
        password,
      });
      console.log(res);
      if (res.data != null) {
        alert("user made");
        window.location.href = "http://localhost:3001/";
      }
    }
  };

  return (
    <>
      <style>
        {`
          body {
            font-family: system-ui;
            background: #FFC300;
            color: white;
            text-align: center;
          }
        `}
      </style>
      <div style={divStyle}>
        <div>
          <h1>Sign Up</h1>
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
      </div>
    </>
  );
}
