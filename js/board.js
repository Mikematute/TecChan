$(document).ready(function(){

  function getUrlParameter(paramName){
      var results = new RegExp('[\?&]' + paramName + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }

  $("#boardName").text(getUrlParameter("board"));




});
