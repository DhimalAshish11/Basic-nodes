import express from "express";

const app = express();
const PORT = 8000;

import path from "path";
import fs from "fs";

const __dirname = path.resolve();
const fn = __dirname + "/userList.csv";

//middleware
app.use(express.urlencoded());

///router register

app.get("/register", (req, res) => {
  console.log("req.query");

  //res.send("<h1>You are in resgistration</h1>");
  res.sendFile(__dirname + "/src/regForm.html");
});
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const str = `${email}, ${password}\n`;
  fs.appendFile(fn, str, (error) => {
    error ? console.log(error.message) : console.log("added to the file");
  });
});

app.get("/login", (req, res) => {
  console.log("received request to home login");

  res.sendFile(__dirname + "/src/loginForm.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = `${email}, ${password}`;

  fs.readFile(fn, (error, data) => {
    error && console.log(error.message);

    const userStr = data.toString();
    const userArg = userStr.split("\n");

    if (userArg.includes(str)) {
      res.send("<h1 style = 'color:green'> Logged in </h1>");
    } else {
      res.send("<h1 style = 'color:red'> Invalid Logged in </h1>");
    }
  });

  /* res.send(""); */
});

///router home
app.get("/", (req, res) => {
  console.log("received request to home router");

  res.send(`<h1>You are in homepage</h1>
          <a href = "/register">
          <button>Register</button>
          <a/>

          <a href = "/login">
          <button>Login</button>
          <a/>

    `);
});

///make our server available on http request

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server running at http://localhost:${PORT}`);
});
