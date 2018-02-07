    var socket = io();
    function setUserName() {
      socket.emit('setUserName', document.getElementById('name').value);
    }

    var user;

    socket.on('userExists', function(data) {
      document.getElementById('error').innerHTML = data;
    });

    socket.on('userSet', function(data) {
      user = data.username;
      var container = document.getElementsByClassName('form')[0];
      container.innerHTML = '\
          <div class="row">\
            <div class="col-md-10">\
              <div class="form-group">\
                <input type="text" class="form-control" id="message" placeholder="Пиши здесь...">\
              </div>\
              <button type="button" class="btn btn-primary" name="button" onclick="sendMessage()">Отправить</button>\
              <div id="message-container"></div>\
            </div>\
          </div>\
      ' 
    });

    function sendMessage() {
      var messageData = document.getElementById('message').value;
      if (messageData) {
        socket.emit('message', {user: user, message: messageData});
      }

      document.getElementById('message').value = '';
    }
    socket.on('newMessage', function(data){
      if(user) {
        document.getElementById('message-container').innerHTML +=  '<div class="panel panel-info"><div class="panel-heading">' + data.user + ':</div><div class="panel-body">' + data.message + '</div></div>';
      }
    });