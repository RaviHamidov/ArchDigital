const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json(`HTTP GET request received`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send_email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ravihamidov42@gmail.com',
          pass: 'okby lvhk hwcf hbbm'
        }
    });

    const mailOptions = {
        from: email,
        to: 'ravihamidov42@gmail.com',
        subject: `Subject: ${subject}`,
        text: `From: ${name}\nEmail: ${email}\n\n${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.json({ message: 'error' });
        } else {
          console.log('Email sent: ' + info.response);
          res.json({ message: 'success' });
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${port}`);
});
