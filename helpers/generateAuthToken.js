const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = {
  id: '123',
  username: 'Tariq', 
  role: 'admin'
};

// Generate a token
const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

console.log('Authorization Token:', token);
