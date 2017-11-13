$(document).ready(function(){

  $("#searchButton").on("click", function(){

    $("#cont").html( "<p></p>" );

		var sValue = $("#sValue").val();

		if (sValue != ""){
      var jsonSearch = {
                          "action": "search",
    											"sValue": sValue
    										};
      $.ajax({
    		url : "./data/appLayer.php",
    		type : "POST",
    		data : jsonSearch,
    		ContentType : "application/json",
    		dataType : "json",
    		success : function(dataReceived){
          //console.log(dataReceived);

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
    			//$("#cont").html( "<p>We ddint find anything useful</p>" );
          alert(errorMessage.statusText);
    		}

    	});

		}
	});

  $("#cont").on("click", ".ThreadName", function(){
    var thread = $(this).attr("id");
    $(location).attr('href', 'Thread.html?thread='+thread);
	});

});
