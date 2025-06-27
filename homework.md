- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test , /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde ( ^ vs ~ )

Ans to above questions-

# Project Setup Notes

- **Create a repository**  
  → Use `git init` to initialize a Git repo

- **Initialize the repository**  
  → Run `npm init -y` to create `package.json`

- **node_modules, package.json, package-lock.json**  
  → `node_modules`: installed packages  
  → `package.json`: lists dependencies & scripts  
  → `package-lock.json`: locks exact versions

- **Install express**  
  → `npm install express`

- **Create a server**  
  →

  ```js
  const express = require("express");
  const app = express();
  ```

- **Listen to port 7777**  
  →

  ```js
  app.listen(7777, () => console.log("Server running"));
  ```

- **Write request handlers for /test , /hello**  
  →

  ```js
  app.get("/test", (req, res) => res.send("Test route"));
  app.get("/hello", (req, res) => res.send("Hello route"));
  ```

- **Install nodemon and update scripts inside package.json**  
  → `npm install --save-dev nodemon`  
  → Inside `package.json`:

  ```json
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
  ```

- **What are dependencies**  
  → Packages your app needs to run (like express)

- **What is the use of "-g" while npm install**  
  → Installs a package **globally** (usable from any folder)

- **Difference between caret and tilde ( ^ vs ~ )**  
  → `^`: Updates to latest **minor** version (e.g. `^1.2.3` → `1.x.x`)  
  → `~`: Updates to latest **patch** version (e.g. `~1.2.3` → `1.2.x`)

# 📚 Multiple Route Handlers in Express.js

## ❓ Question: What is `next()` in Express?

### ✅ Answer:

`next()` is a function in Express used to pass control to the next middleware function. If it’s not called, the next handler in the chain will not run.

---

## ❓ Question: How does `res.send()` affect `next()`?

### ✅ Answer:

Once `res.send()` is called, the response is considered finished. Calling `next()` after `res.send()` can cause an error because the response is already sent.

Example:

```js
res.send("Hello"); // Ends the response
next();            // ❌ Error if called after res.send




❓ Question: How do multiple route handlers work?
✅ Answer:
You can use multiple functions for a single route. Each middleware/handler is executed in order, and must call next() to continue to the next one.

Example:

js
Copy
Edit
app.get('/example', handler1, handler2);
❓ Question: What is the use of arrays in route handlers?
✅ Answer:
You can group handlers in an array, and they will be executed in order. Useful for modular middleware.

Example:

js
Copy
Edit
app.use("/route", rH1, [rH2, rH3], rH4, rH5);
Execution order: rH1 → rH2 → rH3 → rH4 → rH5 (if each calls next())

❓ Question: What happens if one handler does not call next()?
✅ Answer:
The chain stops there. No further handlers are executed.

```

# 📘 Express.js Concepts and Middleware

## ❓ What is a Middleware? Why do we need it?

### ✅ Answer:

A middleware in Express is a function that has access to the request, response, and `next()` function. It runs between the request and the final response.

We need middleware to:

- Modify request/response objects
- Execute code before route handlers
- Handle errors
- Manage authentication, logging, validation, etc.

---

## ❓ How does Express.js handle requests behind the scenes?

### ✅ Answer:

Express uses a stack-like structure of middleware and route handlers. When a request comes in:

1. It goes through `app.use()` and route middlewares in the order they are defined.
2. If a matching route is found, its handler is called.
3. If `next()` is called, the request moves to the next matching middleware or route.
4. If none match, a 404 handler is called.

---

## ❓ Difference between `app.use()` and `app.all()`

### ✅ Answer:

- `app.use(path, middleware)` handles **all HTTP methods** but **does not check for exact HTTP methods**. It’s commonly used for middleware.
- `app.all(path, handler)` matches **all HTTP methods (GET, POST, etc.)** for the given route. It's used for universal route handling.

Example:

```js
app.use('/admin', authMiddleware); // All methods, acts like a filter
app.all('/maintenance', handler);  // GET, POST, PUT, DELETE etc.


❗ Error Handling Middleware in Express
Use a special middleware function with 4 arguments (err, req, res, next):

js
Copy
Edit
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



Project Learnings - MongoDB + Mongoose + Express (Q&A)

1️⃣ How to create a free cluster?Go to https://www.mongodb.com/cloud/atlas, sign up, create a free shared cluster, and get your SRV connection string.

2️⃣ How to install Mongoose?Run npm install mongoose in your Node.js project.

3️⃣ How to connect to the database?Use Mongoose's connect method with your connection URL in a connectDB function. Example:

const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/devTinder");
};
module.exports = connectDB;

4️⃣ When to call connectDB?Call it before starting your Express app. Example:

connectDB().then(() => {
  app.listen(7777, () => console.log("Server running"));
});

5️⃣ How to create a userSchema and model?

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
});
module.exports = mongoose.model("User", userSchema);

6️⃣ How to make POST /signup API?

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("Error saving user");
  }
});

7️⃣ How to push documents?Use Postman to call POST /signup with JSON body.

8️⃣ How to handle errors?Wrap DB operations in try...catch to catch and handle save errors gracefully.

Project Learnings - MongoDB + Mongoose + Express (Q&A)

1️⃣ How to create a free cluster?Go to https://www.mongodb.com/cloud/atlas, sign up, create a free shared cluster, and get your SRV connection string.

2️⃣ How to install Mongoose?Run npm install mongoose in your Node.js project.

3️⃣ How to connect to the database?Use Mongoose's connect method with your connection URL in a connectDB function. Example:

const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/devTinder");
};
module.exports = connectDB;

4️⃣ When to call connectDB?Call it before starting your Express app. Example:

connectDB().then(() => {
  app.listen(7777, () => console.log("Server running"));
});

5️⃣ How to create a userSchema and model?

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
});
module.exports = mongoose.model("User", userSchema);

6️⃣ How to make POST /signup API?

app.use(express.json()); // parse JSON body

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("Error saving user");
  }
});

7️⃣ How to push documents?Use Postman to call POST /signup with a JSON body (like { "firstName": "John" }).

8️⃣ How to handle errors?Wrap DB operations in try...catch to catch and handle save errors gracefully.

9️⃣ JS object vs JSON?

JS Object: can have functions, variables, undefined, etc.

JSON: string format, must be key-value pairs with only string/number/boolean/null/array/object values.

🔟 Express JSON middleware?Use app.use(express.json()) to parse incoming JSON request bodies.

1️⃣1️⃣ Dynamic signup?Use req.body to receive user data from client/postman instead of hardcoding.

1️⃣2️⃣ Duplicate email?User.findOne({ emailId: "test@example.com" }) returns the first matching document (or null if not found).

1️⃣3️⃣ Get user by email?

app.get("/user", async (req, res) => {
  const user = await User.findOne({ emailId: req.query.email });
  res.send(user);
});

1️⃣4️⃣ Feed API (GET /feed)?

app.get("/feed", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

1️⃣5️⃣ Get user by ID?

app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

1️⃣6️⃣ Delete user API?

app.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});

1️⃣7️⃣ PATCH vs PUT?

PUT replaces the whole document

PATCH updates only the specified fields

1️⃣8️⃣ Update user (PATCH)?

app.patch("/user/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  res.send(updated);
});

1️⃣9️⃣ Mongoose Model Methods?Explore methods like .find(), .findOne(), .findById(), .updateOne(), .deleteOne() in Mongoose docs.

2️⃣0️⃣ Options in findOneAndUpdate()?Common options:

{ new: true } → returns updated doc

{ upsert: true } → creates if not exists

{ runValidators: true } → validates against schema

2️⃣1️⃣ Update user by email ID?

app.patch("/user", async (req, res) => {
  const updated = await User.findOneAndUpdate(
    { emailId: req.body.emailId },
    { $set: req.body },
    { new: true }
  );
  res.send(updated);
});

```
