$(document).ready(function(){

  function getUrlParameter(paramName){
      var results = new RegExp('[\?&]' + paramName + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }
  var boardName = getUrlParameter("board")

  $("#boardName").text(boardName);

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
      console.log(dataReceived);
      /*
      var newHtml = "";
			var leng = dataRecieved.length;
			for (k=0;k<leng;k++){

				console.log(dataRecieved[k]);

				//newHtml += '<tr>';
				//newHtml += '<td>' + dataRecieved[k]["user"] + '</td>';
				//newHtml += '<td>' + dataRecieved[k]["com"] + '</td>';
				//newHtml += '</tr>';

			}
      */
			//$("#commentsTable").append(newHtml);
		},
		error : function(errorMessage){
			//If there is no cookie, we do nothing
		}

	});




});
