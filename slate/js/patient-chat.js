$( document ).ready(function() {

// ------------ FIREBASE CHAT ------------
  var myDataRef = new Firebase('https://burning-inferno-7459.firebaseio.com');
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {

      // var name = 'Mom';
      var name = 'Logan';
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
    var timelineButton = $('<button/>').hide();
    var doctorButton = $('<button/>').hide();
    messageDiv.appendTo($('#messagesDiv'));
    timelineButton.appendTo(messageDiv);
    doctorButton.appendTo(messageDiv);
    // .appendTo($('#messagesDiv'));
  }


// ------------ END FIREBASE CHAT ------------
// ------------ BUBBLE BOOKMARK / DOCTOR EVENT ------------

  $('#messagesDiv').on('click', function(e){
      var message = e.target
      $('.header, ui-footer').hide();
      $('.fade_bookmark_message').append(message);
      $('.fade_bookmark .from_mom').css('margin', '30px 0 40px 0').css('float', 'none')
      $('.fade_bookmark').show();
    // $('#myModal').modal('show');
  });


  $('.bookmark_button').on('click', function(e){
      var message_text = $('.fade_bookmark .from-mom').text();
      // var message_num = $('.fade_bookmark .from-mom').attr('data-message-num');
      var message_obj = {message : message_text}
      // check to see if messages already exist, pull and stringify because localstorage only takes strings
      if (localStorage.getItem('bookmarked_message')) {
          var message_array = JSON.parse(localStorage.getItem('bookmarked_message'));

          message_array.push(message_obj);

          localStorage.setItem('bookmarked_message', JSON.stringify(message_array));
      // create new array in localstorage if none exist
      } else {
        var message_array = [message_obj]
        localStorage.setItem('bookmarked_message', JSON.stringify(message_array));
      }

  })

  // $('.notify_doctor_button').on('click', function(e) {
  //    var message_text = $('.fade_bookmark .from-mom').text();
  //    var message_obj = {message : message_text}
  //      if (localStorage.getItem('doc_message')) {
  //         var message_array = JSON.parse(localStorage.getItem('doc_message'));

  //         message_array.push(message_obj);

  //         localStorage.setItem('doc_message', JSON.stringify(message_array));
  //     // create new array in localstorage if none exist
  //     } else {
  //       var message_array = [message_obj]
  //       localStorage.setItem('doc_message', JSON.stringify(message_array));
  //     }
  // })



  $('.cancel_bookmark_button').on('click', function(e){
      $('.fade_bookmark_message').empty();
      $('.header, ui-footer').show()
      $('.fade_bookmark').hide();
  })




  //

});
