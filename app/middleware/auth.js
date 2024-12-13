const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (!token) {
    console.error('Authorization Error: Token is required');
    return res.status(401).json({ error: 'Token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Authorization Error: Invalid or expired token');
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user;

    console.log('Authorization Header:', authHeader);
    console.log('Decoded Token:', user);

    next();
  });
};

module.exports = authenticateToken;
