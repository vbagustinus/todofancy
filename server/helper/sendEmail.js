function sendEmail(task){
  const nodemailer = require('nodemailer')
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          user: 'testemailajah@gmail.com',
          pass: 'testemail12345'
      }
  });
  // let tanggal = deadline.getDate() +' - ' + deadline.getMonth()+' - '+deadline.getFullYear();
  // console.log('AKAN DI KIRIM',task)
  let mailOptions = {
      from: 'testemaiajah@gmail.com',
      to: task.user_id.email,
      subject: 'Remainder Your TODO',
      text: `Hallo ${task.user_id.name}, hanya mau mengingatkan TODOmu ${task.title} pada ${task.remainder}, todomu akan di hapus secara otomatis jika anda sudah mendapat email ini. Terima Kasih banyak`
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log('Waduh', error.message);
      }
       else {
         console.log(info);
       }

  });
}
module.exports = sendEmail;
