$(document).ready(function(){

	/*
	$.ajax({
		url : "./data/cookieService.php",
		type : "POST",
		dataType : "json",
		success : function(dataReceived){
			$("#username").val(dataReceived.cookieUsername);
		},
		error : function(errorMessage){
			//alert(errorMessage.statusText);
		}

	}); */

	$("#loginButton").on("click", function(){

		var username = $("#uName").val();
		var password = $("#uPassword").val();
		var remember = $("#rememberMe").is(":checked");

		if (username != "" && password != "")
		{
			var jsonToSend = {
								"uName" : username,
								"uPassword" : password,
								"rememberMe" : remember,
								"action" : "LOGIN"
							 };

			$.ajax({
				url : "./data/appLayer.php",
				type : "POST",
				data : jsonToSend,
				ContentType : "application/json",
				dataType : "json",
				success : function(dataReceived){
					window.location.replace("./index.html");
				},
				error : function(errorMessage){
					alert(errorMessage.statusText);
				}

			});
		}
	});
	$("#cancelButton").on("click", function(){
			window.location.replace("./index.html");
	});
});
