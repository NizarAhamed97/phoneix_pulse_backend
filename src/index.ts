import express from 'express';
import bodyParser from 'body-parser';
import mainRouter from './datasource'; // Import the main datasource router

const app = express();
const PORT = 5000; // Define your port
const cors = require('cors');

const corsOptions = {
  origin: '*', // Allow all origins (or specify your frontend origin, e.g., 'http://localhost:3000')
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); // Parse JSON bodies

// Use the main router which connects all submodules
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
