$(document).ready(function(){

  var jsonTips = {
                      "action": "getPend"
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
        newHtml += '<p> id:' + data[ik]["id"] + '<p>';
				newHtml += '</div>';

			}

			$("#cont").append(newHtml);
		},
		error : function(errorMessage){
			//If there is no cookie, we do nothing
		}

	});

});
