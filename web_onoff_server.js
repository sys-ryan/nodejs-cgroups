// console.time('test');
const fs = require('fs')
const {performance} = require('perf_hooks')
const start = performance.now();


const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req , file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) =``> {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    // 'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/messages?retryWrites=true'
    'mongodb://localhost:27017/test'
  )
  .then(result => {
    app.listen(8080);
    // const testTime = console.timeEnd('test')
    const end = performance.now();
    // console.log(end - start)
    let lapse = end - start;
    lapse = lapse + '\n';
    console.log(lapse);
    
    const savePath = './web_onAndOff.txt';
    return addData(savePath, lapse)
  })
  .then(data => {
    process.exit()
  })
  .catch(err => console.log(err));

  // append data to a file
function addData (savePath, data) {
  const promise = new Promise((resolve, reject) => {
    fs.appendFile(savePath, data, (err) => {
      if (err) {
          throw err;
      }
      resolve();
    });
  })
  return promise;
}
