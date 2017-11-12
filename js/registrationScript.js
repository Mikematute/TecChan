 $(document).ready(function() {

  $("#registerButton").on("click", function(){
        var jsonObject = {
            "userName" : $("#userName").val(),
            "userMatr" : $("#userMatr").val(),
            "userMail" : $("#userMail").val(),
            "userPassword" : $("#userPassword").val(),
            "action" : "REGIS"
        };
        //console.log(jsonObject);

        $.ajax({
                url : "./data/appLayer.php",
                type : "POST",
                data : jsonObject,
                ContentType : "application/json",
                dataType : "json",
                success : function(dataReceived){
                    window.location.replace("./index.html");
                },
                error : function(errorMessage){
                    alert(errorMessage.statusText);
                }

            });
   });

   $("#cancelButton").on("click", function(){
        window.location.replace("index.html");
   });

});
