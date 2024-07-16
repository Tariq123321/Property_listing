const jwt = require('jsonwebtoken');

// Middleware to check user role
const roleAuth = (roles) => {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      console.error("No token provided");
      return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Unauthorized\n", err);
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!roles.includes(decoded.role)) {
        console.error("Access denied");
        return res.status(403).json({ message: 'Access denied' });
      }
      console.log("Successful authentication");
      req.user = decoded; // Attach user info to request
      next();
    });
  };
};

module.exports = roleAuth;
