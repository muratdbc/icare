$( document ).ready(function() {

// ------------ FIREBASE CHAT ------------
  var myDataRef = new Firebase('https://burning-inferno-7459.firebaseio.com');
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = 'John';
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
    if (name == "Nancy" || name == "Mom" ) {
      addMessage('from-mom', name, text);
    } else {
      addMessage('from-not-mom', name, text);
    }
    $('<div/>').addClass('clear').appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    messageNum++;
  };

  function addMessage(fromClass, name, text) {
    var messageDiv = $('<div/>').append(text).addClass(fromClass).attr('data-message-num', messageNum)
    var timelineButton = $('<button/>').text('Add To Timeline').hide();
    var doctorButton = $('<button/>').text('Alert Doctor').hide();
    messageDiv.appendTo($('#messagesDiv'));
    timelineButton.appendTo(messageDiv);
    doctorButton.appendTo(messageDiv);
    // .appendTo($('#messagesDiv'));
  }


// ------------ END FIREBASE CHAT ------------
// ------------ BUBBLE BOOKMARK / DOCTOR EVENT ------------

  $('#messagesDiv').on('click', function(e){
      var message = e.target

      $('.fade_bookmark_message').append(message)
      $('')
      $('.fade_bookmark').show()
    // $('#myModal').modal('show');
  });




  //

});
