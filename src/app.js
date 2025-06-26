const express = require("express");

const app = express();

app.get("/users", (req, res) => {
  res.send({
    firstname: "Prasanna",
    lastname: "wankhede",
  });
});

app.post("/users", (req, res) => {
  res.send("data Saved Successfully ");
});

// app.use("/hello/2", (req, res) => {
//   res.send("hello - 2");
// });
// app.use("/hello", (req, res) => {
//   res.send("hello");
// });

// app.use("/", (req, res) => {
//   res.send("Welcome  ");
// });

// app.use((req, res) => {
//   res.send("hello from my   server");
// });

app.listen(3000, () => {
  console.log("server is successfully listening on port number  3000... ");
});
