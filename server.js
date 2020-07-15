// ※このファイルを書き換えたらサーバーを再起動

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
  req.io.join(req.data.chat_room); // joining room name specified by req.data into route. in this case, req.data = ROOM
  req.io.join(req.data.signal_room);
  app.io.room(req.data).broadcast('announce', { // send broadcast message to the room(in this case, type of the message is 'announce')
    message: 'New client in the ' + req.data + ' room.'
  });
});

app.io.route('send', (req) => {
  app.io.room(req.data.room).broadcast('message', { // app.io broadcast sends a message to all one in the room including the sender
    message: req.data.message,
    author: req.data.author
  });
});

app.io.route('signal', (req) => { // for signaling
  req.io.room(req.data.room).broadcast('signaling_message', { // req.io broadcast sends a message to others in the room
    type: req.data.type,
    message: req.data.message
  });
});

app.listen(PORT);