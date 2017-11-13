$(document).ready(function(){

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
			var uRol = dataReceived.uRol;

      if (uRol == "0"){
        window.location.replace("./index.html");
      }
		},
		error : function(errorMessage){
        window.location.replace("./index.html");
		}

	});

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
        //<button type=\"button\" id=\"login\">Login</button><button type=\"button\" id=\"regis\">Register</button>

				newHtml += '<div class="Post">';
				newHtml += '<p>' + data[ik]["post"] + '<p>';
        newHtml += '<p> User:' + data[ik]["username"] + '<p>';
        newHtml += '<p> Date:' + data[ik]["date"] + '<p>';
        newHtml += '<div id=' + data[ik]["id"] + '>';
        newHtml += '<button type=\"button\" id=\"yes\">Apporve</button><button type=\"button\" id=\"no\">Erase</button>';
        newHtml += '</div>';
				newHtml += '</div>';

			}

			$("#cont").append(newHtml);
		},
		error : function(errorMessage){
			//If there is no cookie, we do nothing
		}

	});

  $("#cont").on("click", "#yes", function(){
    var tID = $(this).closest("div").attr("id");
    var jsonYES = {
                        "action": "yTip",
                        "tID": tID
                      };
    $.ajax({
      url : "./data/appLayer.php",
      type : "POST",
      data : jsonYES,
      ContentType : "application/json",
      dataType : "json",
      success : function(dataReceived){
        window.location.reload();
      },
      error : function(errorMessage){
        console.log(errorMessage);
      }

    });
	});

  $("#cont").on("click", "#no", function(){
    var tID = $(this).closest("div").attr("id");
    var jsonNO = {
                        "action": "dTip",
                        "tID": tID
                      };
    $.ajax({
      url : "./data/appLayer.php",
      type : "POST",
      data : jsonNO,
      ContentType : "application/json",
      dataType : "json",
      success : function(dataReceived){
        window.location.reload();
      },
      error : function(errorMessage){
        console.log(errorMessage);
      }

    });
	});

});
