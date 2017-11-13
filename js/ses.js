$(document).ready(function(){
	//Implement Menu function
	/*
	<li id=#HOME> Home </li>
	<li id=#SEARCH> Search </li>
	<li id=#TIPS> Tips </li>
	<li id=#ABOUT> About </li>
	*/

	$("#HOME").on("click", function(){
    window.location.replace("./index.html");
	});
	$("#SEARCH").on("click", function(){
    window.location.replace("./Search.html");
	});
	$("#TIPS").on("click", function(){
    window.location.replace("./Tips.html");
	});
	$("#ABOUT").on("click", function(){
    window.location.replace("./About.html");
	});

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
