const nodemailer = require('nodemailer');
const hbs=require('nodemailer-express-handlebars');
const path = require('path');
const config = require('./config.json');
const transporter = nodemailer.createTransport(config.local.transport);



var mail= {
  from:config.local.email.from,
  to:config.local.email.to,
  cc:'tutsygaming@gmail.com',
  subject:config.local.email.subject,
  text:'Game',
  template:'index'
};

const handlebarOptions = {
  viewEngine:{
    extName:".html",
    partialsDir:path.resolve('./views'),
    defaultLayout:false,
  },
  viewPath:path.resolve('./views'),
  extName:".handlebars",
}

transporter.use('compile',hbs(handlebarOptions));


transporter.sendMail(mail, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});