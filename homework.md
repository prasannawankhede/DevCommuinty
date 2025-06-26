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
