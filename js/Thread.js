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

});
