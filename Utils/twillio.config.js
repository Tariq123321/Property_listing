require('dotenv').config();

const accountSid = process.env.TWILLIO_ID;
const authToken = process.env.TWILLIO_PASSWORD;
const client = require('twilio')(accountSid, authToken);


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
}

const createAndSendOTP = (phone, content) => {
  client.messages.create({
    body: content,
    to: phone,
    from: process.env.TWILLIO_PHONE_NO
  })
  .then(message => console.log(`OTP sent successfully: ${message.sid}`))
  .catch(error => console.error(`Error sending OTP: ${error.message}`));
}

// const phoneNumber = "+916306631150"; // User's phone number in India
// const otp = generateOTP();
// createAndSendOTP(phoneNumber, `Your OTP is ${otp}`);

// module.exports = client
module.exports = {createAndSendOTP,generateOTP}