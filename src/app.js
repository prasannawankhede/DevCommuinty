const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "virat",
    lastName: "kohli",
    emailId: "king@@@",
    password: "ff4dfddd21",
  };

  const user = new User(userObj);
  await user.save();

  res.send("User added successfully");
});

connectDB()
  .then(() => {
    console.log("Database Connection Established");
    app.listen(3000, () => {
      console.log("server is successfully listening on port number  3000... ");
    });
  })
  .catch((err) => {
    console.error("Dtatbase connot be connected");
  });
