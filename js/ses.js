$(document).ready(function(){
	//variable for Login Button

	var jsonSess = {
											"action": "getSession"
										};
	$.ajax({
		url : "./data/appLayer.php",
		type : "POST",
		data : jsonSess,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
			$("#ses").html( "<p>" + dataReceived.uName + "</p> <button type=\"button\" id=\"logout\">LogOut</button>" );
		},
		error : function(errorMessage){
			$("#ses").html( "<button type=\"button\" href=./login.html>Login</button>" );
		}

	});


});
