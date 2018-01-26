var me = {};
me.avatar = "http://www.arcadeperu.com/userfiles/images/varios/convenios/Corporacion-Grupo-Romero.png?size=80";

var you = {};
you.avatar = "https://icon-icons.com/icons2/582/PNG/512/man-2_icon-icons.com_55041.png?size=80";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());

    if (who == "watson"){
        control = '<div class="chat-message clearfix">'+
                    '<img src="images/operadora.png" alt="" width="32" height="32">'+
                    '<div class="chat-message-content clearfix">'+
                      '<span class="chat-time">'+date+'</span>'+
                      '<h5>Danae (Operadora)</h5>'+
                      '<p>'+text+'</p>'+
                    '</div>'+
                  '</div>'+
                  '<hr>';
    }else{
        control = '<div class="chat-message clearfix">'+
                    '<img src="images/person-avatar.png" alt="" width="32" height="32">'+
                    '<div class="chat-message-content clearfix">'+
                      '<span class="chat-time">'+date+'</span>'+
                      '<h5>Usuario</h5>'+
                      '<p>'+text+'</p>'+
                    '</div>'+
                  '</div>'+
                  '<hr>';
    }
    setTimeout(
        function(){
            $("#divChatBot").append(control);
            $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
        }, time);

}

function resetChat(){
    $("ul").empty();
}
var contexto = {};
$(".mytext").on("keyup", function(e){
    if (e.which == 13){
        var text = $(this).val();
	      insertChat("user", text);
        if (text !== ""){
        		enviarPregunta(text);
            $(this).val('');
        }
    }
});

function enviarPregunta(text){
  $("#typing").show();
  $.ajax({
    type: "POST",
    url: "/api/bot",
    timeout: 120000,
    beforeSend: function (jqXHR, settings) {
    },
    /*data: {
      contexto:contexto,
      texto:text
    },*/
    data: {
      msgId: "99999990000000000000000000000000000000000000g3cs",
      fecMin:"01/01/18",
      fecMax:"02/01/18"
    },
    success: function (data) {
      contexto = data.watson.context;
      respuesta = data.watson.output.text[0];
      insertChat("watson", respuesta);
    },
    error: function (jqXHR, textStatus, err) {

    },
    complete: function (jqXHR, textStatus) {
      $("#typing").hide();
    }
  });
}
// //-- Clear Chat

// resetChat();

// //-- Print Messages
// insertChat("me", "Hello Tom...", 0);
// insertChat("you", "Hi, Pablo", 1500);
// insertChat("me", "What would you like to talk about today?", 3500);
// insertChat("you", "Tell me a joke",7000);
// insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
// insertChat("you", "LOL", 12000);


//-- NOTE: No use time on insertChat.


(function() {

	$('#live-chat header').on('click', function() {

		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');

	});

	$('.chat-close').on('click', function(e) {

		e.preventDefault();
		$('#live-chat').fadeOut(300);

	});
  //Inicializa chat
  enviarPregunta('');
}) ();
