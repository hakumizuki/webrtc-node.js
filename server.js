var express = require('express');
var app = express();
console.log('server started');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(3000);