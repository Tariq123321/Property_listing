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


https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509619!2d144.9537363153159!3d-37.81627977975165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5773e5e8b87c8e5!2sVictoria%20Harbour%20Promenade%2C%20Docklands%20VIC%203008%2C%20Australia!5e0!3m2!1sen!2sus!4v1601629965219!5m2!1sen!2sus