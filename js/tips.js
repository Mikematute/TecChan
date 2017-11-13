$(document).ready(function(){

  var jsonTips = {
                      "action": "getTips"
										};
	$.ajax({
		url : "./data/appLayer.php",
		type : "POST",
		data : jsonTips,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
      var data = dataReceived

      var newHtml = "";
			var leng = data.length;
			for (var ik=0; ik<leng; ik++){
				//console.log(data[ik]["id"]);

				newHtml += '<div class="Post">';
				newHtml += '<p>' + data[ik]["post"] + '<p>';
        newHtml += '<p> User:' + data[ik]["username"] + '<p>';
        newHtml += '<p> Date:' + data[ik]["date"] + '<p>';
				newHtml += '</div>';

			}

			$("#cont").append(newHtml);
		},
		error : function(errorMessage){
			//If there is no cookie, we do nothing
		}

	});

  var jsonNew = {
											"action": "getSession"
										};
	$.ajax({
		url : "./data/appLayer.php",
		type : "POST",
		data : jsonNew,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
      var uRol = dataReceived.uRol;

      if (uRol == "0"){
        $("#tipsPend").hide();
      }else{
        $("#tipsPend").click(function(){
          window.location.replace("./TipsPendientes.html");
      	});
      }

      var newHtml = "";
  		newHtml += '<fieldset>';
  		newHtml += '<label>Leave a new Tip</label><br>';
      newHtml += '<textarea class=\"textClass\" id=\"pCont\" rows="4" cols="50"></textarea><br>';
      newHtml += '<input type="submit" id="submitBtt" value="Create!">';
  		newHtml += '</fieldset>';

      $("#newTip").html(newHtml);
		},
		error : function(errorMessage){
			var newHtml = "<t>No Puede Dejar Tips como anonimo</t>";

      $("#newTip").html(newHtml);

      $("#tipsPend").hide();
		}
	});

  $("#newTip").on("click", "#submitBtt", function(){
    var pCont = $("#pCont").val();
    var jsonUser = {
  											"action": "getSession"
  										};
  	$.ajax({
  		url : "./data/appLayer.php",
  		type : "POST",
  		data : jsonUser,
  		ContentType : "application/json",
  		dataType : "json",
  		success : function(dataReceived){
        var uName = dataReceived.uName;
        var jsonNTip = {
      											"action": "nTip",
                            "pCont": pCont,
                            "uName": uName
      										};
      	$.ajax({
      		url : "./data/appLayer.php",
      		type : "POST",
      		data : jsonNTip,
      		ContentType : "application/json",
      		dataType : "json",
      		success : function(dataReceived){
            window.location.reload();
      		},
      		error : function(errorMessage){
      			console.log(errorMessage);
      		}

      	});
  		},
  		error : function(errorMessage){
  			window.location.reload();
  		}
  	});

	});

});
