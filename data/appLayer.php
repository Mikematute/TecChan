<?php
  header('Content-type: application/json');
  header('Accept: application/json');
  require_once __DIR__ . '/datalayer.php';

  $action = $_POST["action"];


  switch($action){

    case "LOGIN" :        loginFunction();
                          break;
    case "REGIS" :        regisFunction();
                          break;
    case "getLogCookie" : LogCookie();
                          break;
    case "getSession" :   getSession();
                          break;
    case "delSess" :      delSess();
                          break;
    case "getBoard":      checkBoard();
                          break;
    case "search":        search();
                          break;
    case "getThreadName": threadName();
                          break;
    case "getPosts":      sPost();
                          break;
    case "getTips":       gTips();
                          break;
    case "getPend":       gPend();
                          break;

  }

  function loginFunction(){
    $uName = $_POST["uName"];
		$uPass = $_POST["uPass"];
		$rem = $_POST["rem"];

    $logResponse = attemptLogin($uName, $uPass);

    if ($logResponse["mess"] == "SUCCESS"){
      $response = array("firstname"=>$logResponse["fName"], "lastname"=>$logResponse["lName"]);

      sessionStart($logResponse['fName'], $logResponse['lName']);

      if ($rem == "true"){
        cook("cUsername", $uName);
	    }

      echo json_encode($response);
    }else{
      genericErrorFunction($logResponse["mess"]);
    }
  }

  function regisFunction(){
    $uName = $_POST["uName"];
		$uPass = $_POST["uPass"];
		$fName = $_POST["fName"];
		$lName = $_POST["lName"];
		$email = $_POST["email"];
		$country = $_POST["country"];
		$gender = $_POST["gender"];

    $logResponse = regisUser($fName, $lName, $uName, $uPass, $email, $gender, $country);

    if ($logResponse["mess"] == "SUCCESS"){

      sessionStart($fName, $lName);

      echo json_encode("New User Registered Succesfully");
    }else{
      genericErrorFunction($logResponse["mess"]);
    }

  }

  function genericErrorFunction($errorcode){
    switch($errorcode){
      case "500" :  header("HTTP/1.1 500 Bad connection, portal down");
  		              die("The server is down, we couldn't stablish the data base connection.");
                    break;
      case "406a" : header('HTTP/1.1 406 Session not found yet.');
  	                die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
                    break;
      case "406" :  header("HTTP/1.1 406 User not found. Sorry.");
			              die("Wrong credentials provided.");
                    break;
      case "409" :  header("HTTP/1.1 409 User already in database");
                    die("Please provide another Username.");
      case "501" :  header("HTTP/1.1 501 I dont know");
                    die("Please provide another Username.");
    }
  }

  function cook($stri, $valu){
    setcookie($stri, $valu);
  }

  function LogCookie(){
    if (isset($_COOKIE['cUsername'])){
  		echo json_encode(array('cUsername' => $_COOKIE['cUsername']));
  	}
  	else{
  	   genericErrorFunction("406");
  	}
  }

  function sessionStart($fName, $lName){
    session_start();
    if (!isset($_SESSION['fName'])){
      $_SESSION['fName'] = $fName;
    }
    if (!isset($_SESSION['lName'])){
      $_SESSION['lName'] = $lName;
    }
  }

  function getSession(){
    session_start();
  	if (isset($_SESSION['fName']) && isset($_SESSION['lName']))
  	{
  		echo json_encode(array('fName' => $_SESSION['fName'], 'lName' => $_SESSION['lName']));
  	}
  	else
  	{
  		genericErrorFunction("406a");
  	}
  }

  function delSess(){
    session_start();
  	if (isset($_SESSION['fName']) && isset($_SESSION['lName'])){
  		unset($_SESSION['fName']);
  		unset($_SESSION['lName']);
  		session_destroy();
  		echo json_encode(array('success' => 'Session deleted'));
  	}
  	else{
  		genericErrorFunction("406a");
  	}
  }

  function checkBoard(){
    $bName = $_POST["bName"];
    $logResponse = getBoard($bName);

    //echo json_encode($logResponse);

    if ($logResponse["mess"] == "SUCCESS"){
    //if (True){
      echo json_encode($logResponse["res"]);
    }else{
      genericErrorFunction($logResponse["mess"]);
      //genericErrorFunction("500");
    }
  }

  function search(){
    $sValue = $_POST["sValue"];
    $logResponse = getSearch($sValue);

    //echo json_encode($logResponse);

    if ($logResponse["mess"] == "SUCCESS"){
    //if (True){
      echo json_encode($logResponse["res"]);
    }else{
      genericErrorFunction($logResponse["mess"]);
      //genericErrorFunction("500");
    }
  }

  function threadName(){
    $tID = $_POST["tID"];
    $logResponse = getThreadName($tID);

    //echo json_encode($logResponse);

    if ($logResponse["mess"] == "SUCCESS"){
    //if (True){
      echo json_encode($logResponse);
    }else{
      genericErrorFunction($logResponse["mess"]);
      //genericErrorFunction("500");
    }
  }

  function sPost(){
    $tID = $_POST["tID"];
    $logResponse = getPosts($tID);

    //echo json_encode($logResponse);

    if ($logResponse["mess"] == "SUCCESS"){
    //if (True){
      echo json_encode($logResponse["res"]);
    }else{
      genericErrorFunction($logResponse["mess"]);
      //genericErrorFunction("500");
    }
  }

  function gTips(){
    $logResponse = getTips();

    //echo json_encode($logResponse);

    if ($logResponse["mess"] == "SUCCESS"){
    //if (True){
      echo json_encode($logResponse["res"]);
    }else{
      genericErrorFunction($logResponse["mess"]);
      //genericErrorFunction("500");
    }
  }
  function gPend(){
    $logResponse = getPendientes();

    //echo json_encode($logResponse);

    if ($logResponse["mess"] == "SUCCESS"){
    //if (True){
      echo json_encode($logResponse["res"]);
    }else{
      genericErrorFunction($logResponse["mess"]);
      //genericErrorFunction("500");
    }
  }

?>
