$(document).ready(function(){

  function getUrlParameter(paramName){
      var results = new RegExp('[\?&]' + paramName + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }
  var threadName = getUrlParameter("thread")

  $("#ThreadName").text(threadName);
/*
  var jsonboard = {
                      "action": "getBoard",
											"bName": boardName
										};
	$.ajax({
		url : "./data/appLayer.php",
		type : "POST",
		data : jsonboard,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
      var data = dataReceived

      var newHtml = "";
			var leng = data.length;
			for (var ik=0; ik<leng; ik++){
				//console.log(data[ik]["id"]);

				newHtml += '<div class="Thread">';
				newHtml += '<h3 class="ThreadName" id=' + data[ik]["id"] + '>' + data[ik]["thread"] + '<h3>';
				newHtml += '</div>';

			}

			$("#cont").append(newHtml);
		},
		error : function(errorMessage){
			//If there is no cookie, we do nothing
		}

	});

*/


});
