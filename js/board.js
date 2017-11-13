$(document).ready(function(){

  var sFlag = false;
  var uName = "Anon";
  var uMat = "";
  var uRol = "";

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
      var data = dataReceived

      var newHtml = "";
			var leng = data.length;
			for (var ik=0; ik<leng; ik++){
				//console.log(data[ik]["id"]);

				newHtml += '<div class="Thread">';
				newHtml += '<h3 class="ThreadName" id=' + data[ik]["id"] + '>' + data[ik]["thread"] + '</h3>';
				newHtml += '</div>';

			}

			$("#cont").append(newHtml);
		},
		error : function(errorMessage){
			//If there is no cookie, we do nothing
		}

	});

  $("#cont").on("click", ".ThreadName", function(){
    var thread = $(this).attr("id");
    $(location).attr('href', 'Thread.html?thread='+thread);
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
  		newHtml += '<label>Thread Name</label><br>';
  		newHtml += '<input type=\"text\" class=\"textClass\" id=\"tName\"><br>';
      newHtml += '<input type="submit" id="submitBtt" value="Create!">';
  		newHtml += '</fieldset>';

      $("#newThred").html(newHtml);
		},
		error : function(errorMessage){
			var newHtml = "<t>No Puede Crear un nuevo Thread como anonimo</t>";

      $("#newThred").html(newHtml);
		}

	});

  $("#newThred").on("click", "#submitBtt", function(){
    var tName = $("#tName").val();
    var bName = getUrlParameter("board")
    var jsonNThread = {
  											"action": "nThread",
                        "tName": tName,
                        "tBoard": bName
  										};
  	$.ajax({
  		url : "./data/appLayer.php",
  		type : "POST",
  		data : jsonNThread,
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
