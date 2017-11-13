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
			//console.log(dataReceived);
			var sFlag = true;
			var uName = dataReceived.uName;
			var uMat = dataReceived.uMatr;
			var uRol = dataReceived.uRol;
			$("#ses").html( "<t>" + dataReceived.uName + "</t> <button type=\"button\" id=\"logout\">LogOut</button>" );
		},
		error : function(errorMessage){
			var sFlag = false;
			$("#ses").html( "<button type=\"button\" id=\"login\">Login</button><button type=\"button\" id=\"regis\">Register</button>" );
		}

	});

	$("#ses").on("click", "#logout", function(){
		var jsonDel = {
												"action": "delSess"
											};
		$.ajax({
			url : "./data/appLayer.php",
			type : "POST",
			data : jsonDel,
			ContentType : "application/json",
			dataType : "json",
			success : function(dataReceived){
				window.location.replace("./index.html");
			},
			error : function(errorMessage){
				//No deberia salir mal
			}

		});
	});

	$("#ses").on("click", "#login", function(){
		window.location.replace("./login.html");
	});
	$("#ses").on("click", "#regis", function(){
		window.location.replace("./registration.html");
	});


});
