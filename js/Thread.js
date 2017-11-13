$(document).ready(function(){

  function getUrlParameter(paramName){
      var results = new RegExp('[\?&]' + paramName + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }
  var threadName = getUrlParameter("thread")

  //$("#ThreadName").text(threadName);

  var jsonName = {
                      "action": "getThreadName",
											"tID": threadName
										};
	$.ajax({
		url : "./data/appLayer.php",
		type : "POST",
		data : jsonName,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
      $("#ThreadName").text(dataReceived.tName);
      //console.log(dataReceived);
		},
		error : function(errorMessage){
			//If there is no cookie, we do nothing
		}

	});



  var jsonPosts = {
                      "action": "getPosts",
											"tID": threadName
										};
	$.ajax({
		url : "./data/appLayer.php",
		type : "POST",
		data : jsonPosts,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
      var data = dataReceived

      var newHtml = "";
			var leng = data.length;
			for (var ik=0; ik<leng; ik++){
				//console.log(data[ik]["id"]);

				newHtml += '<div class="Post">';
				newHtml += '<p>' + data[ik]["post"] + '</p>';
        newHtml += '<p> User:' + data[ik]["username"] + '</p>';
        newHtml += '<p> Date:' + data[ik]["date"] + '</p>';
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
      var newHtml = "";
  		newHtml += '<fieldset>';
  		newHtml += '<label>Comment</label><br>';
      newHtml += '<textarea class=\"textClass\" id=\"pCont\" rows="4" cols="50"></textarea><br>';
      newHtml += '<input type="submit" id="submitBtt" value="Create!">';
  		newHtml += '</fieldset>';

      $("#newPost").html(newHtml);
		},
		error : function(errorMessage){
			var newHtml = "<t>No Puede Crear un nuevo Thread como anonimo</t>";

      $("#newPost").html(newHtml);
		}
	});

  $("#newPost").on("click", "#submitBtt", function(){
    var pCont = $("#pCont").val();
    var tID = getUrlParameter("thread")
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
        var jsonNPost = {
      											"action": "nPost",
                            "pCont": pCont,
                            "tID": tID,
                            "uName": uName
      										};
      	$.ajax({
      		url : "./data/appLayer.php",
      		type : "POST",
      		data : jsonNPost,
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
