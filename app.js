//app.js
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {title: 'Home'});
});

app.get('/chat', function(req, res) {
  res.render('chat');
});

var users = [];

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('setUserName', function(data) {
    if (users.indexOf(data) > -1) {
      socket.emit('userExists', '<p class="bg-primary">Пользователь' + 
        '<b>' + data + '</b>' +
        ' уже существует, выбери другое имя!</p>');
    } else {
      users.push(data);
      socket.emit('userSet', {username: data});
    }
  });
  socket.on('message', function(data){
    io.sockets.emit('newMessage', data);
  });
});


var port = 3000;

http.listen(3000, function() {
  console.log('Server start on localhost:3000');
});


