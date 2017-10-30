$(document).ready(function(){
	//variable for Login Button
/*
	var jsonlogin = {
											"action": "getLogCookie"
										};
	$.ajax({
		url : "./data/appLayer.php",
		type : "POST",
		data : jsonlogin,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
			$("#usernameInput").val(dataReceived.cUsername);
		},
		error : function(errorMessage){
			//If there is no cookie, we do nothing
		}

	});
*/

	$(".boardName").click(function(){
    var board = $(this).attr("id");
    $(location).attr('href', 'Board.html?board='+board);
	});

});
