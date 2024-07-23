const nodemailer = require('nodemailer');
const pug = require('pug')
const { htmlToText } = require('html-to-text'); 
require('dotenv').config();



class Email { 

  constructor(user,url){
    this.to = user.email; 
    this.from = "nikhilkesharwani9794@gamil.com";
    this.url = url;
    this.firstName = user.name.split(" ")[0]
    console.log(user,url)
  }


  newTransport(){
    if(process.env.NODE_ENV === 'production'){
      return 1;
    }

    return nodemailer.createTransport({
      host:process.env.HOST,
      port:process.env.PORT,
      auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
      }
    })
  }

  // Sending the actual mail 
  async send(template,subject){
    
    // 1) Render HTMl base a pug template
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`,{
      firstName : this.firstName,
      url : this.url,
      subject,
    })

    // 2) Define email Options 
    const mailOptions = {
      from : this.from,
      to : this.to,
      subject,
      html,
      text: htmlToText(html) // Correctly converting HTML to text
    }

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions)

  }

  // async sendWelcome(){
  //   await this.send('welcome','welcome to my app');
  // }

  async sendEmailVerification(){
    await this.send('emailVerification','please verfiy your email')
  }

  async passwordReset(){
    await this.send('resetPassword','Your password reset link (valid for 10 min only)')
  }

}

module.exports  = Email;



// const sendEmail= async (option)=>{

//   const transporter = nodemailer.createTransport({
//     host:process.env.HOST,
//     port:process.env.PORT,
//     auth:{
//       user:process.env.EMAIL_USERNAME,
//       pass:process.env.EMAIL_PASSWORD
//     }
//   })

//   const mailOptions = {
//     from:"Uttkarsh kesharwani <nikhilkesharwani9794@gmail.com>",
//     to:option.email,
//     text:option.message,
//     subject:option.subject
//   }

//   await transporter.sendMail(mailOptions)
// }

// const sendActivationMail = async(user)=>{
//   const transporter = nodemailer.createTransport({
//     host:process.env.HOST,
//     port:process.env.PORT,
//     auth:{
//       user:process.env.EMAIL_USERNAME,
//       pass:process.env.EMAIL_PASSWORD
//     }
//   })
//   const mailOptions = 
// }

// module.exports = sendEmail;