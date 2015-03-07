$( document ).ready(function() {

  var myDataRef = new Firebase('https://burning-inferno-7459.firebaseio.com');
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = 'Mom';
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });

  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
  });

  var messageNum = 1;
  function displayChatMessage(name, text) {
    console.log(messageNum);
    if (name == "Nancy" || name == "Mom" ) {
      $('<div/>').text(text).addClass("from-mom").attr('data-message-num', messageNum).appendTo($('#messagesDiv'));
    } else {
      $('<div/>').text(text).addClass("from-not-mom").attr('data-message-num', messageNum).appendTo($('#messagesDiv'));
    }
    $('<div/>').addClass('clear').appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    messageNum++;
  };

});
