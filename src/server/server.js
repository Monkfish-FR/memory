/* eslint-disable no-console */
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

// const testRouter = require('./routes/test-routes');
const apiRouter = require('./routes/api-routes');

const SERVER_PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Implement routes
// app.use('/test', testRouter);
app.use('/api', apiRouter);

app.listen(SERVER_PORT, () => {
  console.log(`App is listening at http://localhost:${SERVER_PORT}`);
});
