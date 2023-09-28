let nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");
let { defaultProvider } = require("@aws-sdk/credential-provider-node");

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
  defaultProvider,
});

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

// send some mail
transporter.sendMail(
  {
    from: "tutsygaming@gmail.com",
    to: "javaboyce@gmail.com",
    subject: "Message",
    text: "I hope this message gets sent!",
    ses: {
      // optional extra arguments for SendRawEmail
      Tags: [
        {
          Name: "tag_name",
          Value: "tag_value",
        },
      ],
    },
  },
  (err, info) => {
    console.log(info.envelope);
    console.log(info.messageId);
  }
);