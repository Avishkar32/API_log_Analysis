const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService'); // Import the email service

// POST route to trigger email
router.post('/', async (req, res) => {
    const { subject, body } = req.body; // Assume subject and body are sent in the request body

    const result = await sendEmail(subject, body);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(500).json({ message: result.message });
    }
});

module.exports = router;
