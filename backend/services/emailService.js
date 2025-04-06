const nodemailer = require('nodemailer');

// Email credentials
const senderEmail = 'hitanshi.sahni23@vit.edu';
const receiverEmail = 'hitanshisahni21@gmail.com';
const password = 'hlri clfr uypt mujt'; // Use app-specific password

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: senderEmail,
        pass: password,
    },
});

// Function to send email
const sendEmail = async (subject, body) => {
    const mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: subject,
        text: body,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully!' };
    } catch (error) {
        return { success: false, message: `Failed to send email: ${error.message}` };
    }
};

module.exports = { sendEmail };
