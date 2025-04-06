import axios from 'axios'; // Use ES Module import syntax

import { fetchLogsFromOpenSearch } from "../services/openSearchService.js";


// //const { parseLog } = require("../services/parserService");
import { parseLog, processLogsAndReturnArrays } from "../services/parserService.js";
import { analyzeLogs } from "../services/genAIService.js";
import Log from "../models/Log.js";


// // const analyzeLogHandler = async (req, res) => {
// //   try {
// //     const logs = await fetchLogsFromOpenSearch();
// //     console.log("Fetched logs from OpenSearch:", logs);
// //     const [parsedLogs, latencyMetrics, errorMetrics, spanMetrics] = processLogsAndReturnArrays(logs);



// //     // Save to DB
// //     // for (let log of parsed) {
// //     //   await Log.create({ ...log, genaiAnalysis: analysis });
// //     // }

// //     saveLogsAndMetrics(parsedLogs, latencyMetrics, errorMetrics, spanMetrics);

// //     res.status(200).json({ parsedLogslogs: parsedLogs, latencyMetrics: latencyMetrics, errorMetrics: errorMetrics, spanMetrics: spanMetrics });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Log analysis failed" });
// //   }
// // };

const analyzeLogHandler = async (req, res) => {
  try {
    const logs = await fetchLogsFromOpenSearch();
    console.log("Fetched logs from OpenSearch:", logs);
    const [parsedLogs, latencyMetrics, errorMetrics, spanMetrics] = processLogsAndReturnArrays(logs);
    req.body = {
      parsedLogs,
      latencyMetrics,
      errorMetrics,
      spanMetrics
    };

    // Now, call saveLogsAndMetrics which will use req.body
    await saveLogsAndMetrics(req);

    res.status(200).json({
      parsedLogs,
      latencyMetrics,
      errorMetrics,
      spanMetrics
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Log analysis failed" });
  }
};


// controllers/logController.js
import ParsedLog from '../models/ParsedLog.js';
import LatencyMetric from '../models/LatencyMetric.js';
import ErrorMetric from '../models/ErrorMetric.js';
import SpanMetric from '../models/SpanMetric.js';
import Anomaly from '../models/Anomaly.js'; // Import the Anomaly model

const saveLogsAndMetrics = async (req) => {
  try {
    const {
      parsedLogs = [],
      latencyMetrics = [],
      errorMetrics = [],
      spanMetrics = [],
    } = req.body;

    // Bulk insert each type (skip empty arrays automatically)
    if (parsedLogs.length > 0) await ParsedLog.insertMany(parsedLogs.map(data => ({ data })));
    if (latencyMetrics.length > 0) await LatencyMetric.insertMany(latencyMetrics.map(data => ({ data })));
    if (errorMetrics.length > 0) await ErrorMetric.insertMany(errorMetrics.map(data => ({ data })));
    if (spanMetrics.length > 0) await SpanMetric.insertMany(spanMetrics.map(data => ({ data })));


      // Prepare the 'logs' field by stringifying and concatenating the different arrays
      const logs = JSON.stringify({
        parsedLogs,
        latencyMetrics,
        errorMetrics,
        spanMetrics,
      });
  
      // Call the external API
      const response = await axios.post('https://e775-103-3-41-100.ngrok-free.app/add_logs', { logs });

      const responsetwo = await axios.post("https://e775-103-3-41-100.ngrok-free.app/analyze_logs", {
        "query": "Find patterns in the given logs, especially to predict possible future issues",
        "limit": 10
    } )

    const analysis = responsetwo.analysis;
    const errors = responsetwo.errors;
    const rootCause = responsetwo.root_cause; 


    const newAnomaly = new Anomaly({
      stringAnalysis: analysis,
      stringErrors: errors, // Ensure that errors is an array of strings
      stringRootCause: rootCause
    });

    console.log('New Anomaly:', newAnomaly);
    
    // Save the new Anomaly to the database
    newAnomaly.save()
      .then(savedAnomaly => {
        console.log('Anomaly saved successfully:', savedAnomaly);
      })
      .catch(error => {
        console.error('Error saving anomaly:', error);
      });




  
      // Check if the external API request was successful
      if (response.status === 200) {
        console.log('External API called successfully:', response.data);
      } else {
        console.error('Error calling external API:', response.status, response.data);
      }



    //res.status(201).json({ message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving logs and metrics:', error);
    //res.status(500).json({ error: 'Internal server error' });
  }
};

export { analyzeLogHandler, saveLogsAndMetrics };