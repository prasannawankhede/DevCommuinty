const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
      const { token } = req.cookies;
      console.log(token);
    if (!token) {
        throw new Error("Token is invalid!!!!!!!!!");
    }
    const decodedObj = jwt.verify(token, "dev@tinder");
    
    const { id } = decodedObj; // ✅ matches `id` in token
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user; // ✅ fix typo

    next();
  } catch (err) {
    res.status(404).send("error is   " + err.message);
  }
};

module.exports = {
  userAuth,
};
