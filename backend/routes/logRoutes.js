const express = require("express");

const axios = require('axios'); // Import axios at the top of your file


const { analyzeLogHandler } = require("../controllers/logController");

const router = express.Router();
router.get("/analyze", analyzeLogHandler);

// routes/logRoutes.js
const { saveLogsAndMetrics } = require('../controllers/logController');



router.post('/save-metrics', saveLogsAndMetrics);


module.exports = router;
