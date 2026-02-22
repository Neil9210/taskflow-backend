const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader)
      return res.status(401).json({ msg: "No token" });

    // Remove "Bearer "
    const token = authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ msg: "Invalid token" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
