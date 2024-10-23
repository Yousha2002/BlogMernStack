const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Ensure cookie-parser is used
  if (!token) {
    return res.status(401).json("You are not authenticated");
  }
  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    }
    req.userId = data._id;
    next();
  });
};

module.exports = verifyToken;
