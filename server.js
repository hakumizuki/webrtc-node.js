var express = require('express.io');
var app = express();
app.http().io();
var PORT = 3000;
console.log('server started on port', PORT);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// when someone new entered chat room
app.io.route('ready', (req) => {
  req.io.join(req.data) // joining room name specified by req.data into route
  app.io.room(req.data).broadcast('announce', { // send broadcast message to the room(in this case, type of the message is 'announce')
    message: 'New client in the ' + req.data + ' room.'
  })
})

app.listen(PORT);