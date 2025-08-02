const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "dev_secret_key";

function authenticateToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  const token = auth.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.userId;
    next();
  });
}

module.exports = authenticateToken;
