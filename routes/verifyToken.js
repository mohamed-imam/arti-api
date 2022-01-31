const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  // if (authHeader)
  console.log(req);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2I0ZDRjZjkzNDY5YjU4MzRkMjUzNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzQ2NzU1MCwiZXhwIjoxNjQzNzI2NzUwfQ._RQN22BjR08Pi0Rj2cbZsII5fi2U4d9KzVqKgaGFKKE";
  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) res.status(403).json("Token is not valid!");
    req.user = user;
    next();
  });
  // } else {
  //   return res.status(401).json("You are not authenticated!");
  // }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
