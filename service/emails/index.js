import userModel from '../../models/userModel';

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



const sendEmails = async (email,message) => {
  try {
    const user  = await userModel.findOne({email:email})
    const transporter = nodemailer.createTransport({
      pool:true,
      host: 'smtp.gmail.com',
      port: 465, 
      secure: true,
      auth: {
        user: "bkroland19@gmail.com",
        pass: "sfiy fpbu blun omss",
    },
      tls:{
        rejectUnauthorised:false
      },
      ignoreTLS: true
    });

    const templatePath = path.join(__dirname, '../../views/email/template.ejs');

    const templateData = {
      name:user?.username,
      message:message
    };

    const html = await ejs.renderFile(templatePath, templateData);
    const kodo =  "bkroland19"

    const mailOptions = {
      from: `${kodo} Car pooling`, 
      to: email,
      subject: subject,
      html: html
    };

    // send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);

    return true;
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    return false;
  }
};

export default sendEmails