const nodemailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (Comment) => {
  console.log('inside newComment mailer',comment);

  nodemailer.transporter.sendMail({
    from : 'rsumitaj@gmail.com',
    to : comment.user.email,
    subject : "New Comment",
    html : '<h1>Yup,your comment is published</h1>'
  },(err,info) => {
    if(err){console.log('error in sending mail',err); return;}

    console.log('message sent',info);
    return;
  });
}