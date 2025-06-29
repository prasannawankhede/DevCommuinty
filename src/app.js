const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    validateSignUpData(req);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();

    res.send("User added successfully");
  } catch (err) {
    res.status(404).send("error saving user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = user.getJWT(); // ✅ your method works

    res.cookie("token", token, { httpOnly: true });
    res.send("Login successful!");
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send({
      message: "Profile fetched successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  user = req.user;

  res.send(user.firstName + " is sending connection request");
});

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    res.status(500).send("Error fetching feed");
  }
});

app.get("/id", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    res.send(user);
  } catch (err) {
    res.status(404).send("Error in finding user by id");
  }
});

app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("Error");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.id;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data);
    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("error");
  }
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
