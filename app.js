const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.set('debug', true);
const postRoutes = require('./api/routes/posts');
const userRoutes = require('./api/routes/users');
const pageRoutes = require('./api/routes/pages');

mongoose.connect(
  'mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@cluster0-hxfjo.mongodb.net/' + process.env.DB + '?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology:true
  }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* CORS errors handling */
app.use((res, req, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next();
})

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/pages', pageRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;