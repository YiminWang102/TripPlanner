const express = require('express');
const app = express();
module.exports = app;

const volleyball = require('volleyball');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require('./models');
const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {
  nocache: true
});


app.use(volleyball);


models.sync({
    force: true
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('listening on port 3000');
    });
  });

app.use(express.static(path.join(__dirname, '.public')));

app.get('/', (req, res) => {
  res.render('index');
});

//app.use('/', router);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.render('error');
})
