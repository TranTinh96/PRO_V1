const nodeMailer = require('nodemailer')
var hbs = require('nodemailer-express-handlebars');

//Infomation User
const serviceMail = process.env.HOST_MAIL
const adminEmail = process.env.ADMIN_MAIL
const adminPassword = process.env.ADMIN_PASSWORD


const sendMail = (user, req, token, cb) => {
  var transporter = nodeMailer.createTransport({
    service: serviceMail,
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });

  // Step 2
  const handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: 'views',
      layoutsDir: 'views',
      defaultLayout: 'email.hbs',
    },
    viewPath: 'views',
    extName: '.hbs',
  };
  

  transporter.use('compile', hbs(handlebarOptions));



  const options = {
    from: "no-reply@yourwebapplication.com",
    to: user.email,
    subject: "Account Verification Token",
    template: 'email',
    context: {
      userName :user.userName ,
      hostServer: process.env.HOSR_SERVER_WEB,
      token: token.token
    }

  }
  transporter.sendMail(options, (err, info) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, info)
    }
  });
}

module.exports = {
  sendMail: sendMail
}