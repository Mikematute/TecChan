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
    case "nThread":       nThread();
                          break;

  }

  function loginFunction()
  {
    $uName = $_POST["uName"];
    $uPassword = $_POST["uPassword"];

    $loginResponse = attemptLogin($uName, $uPassword);

    if ($loginResponse["MESSAGE"] == "SUCCESS")
    {
      sessionStart($loginResponse["uName"], $loginResponse["uMatricula"], $loginResponse["uRol"]);
      echo json_encode("Log In Successfull");
    }
    else
    {
      genericErrorFunction($loginResponse["MESS"]);
    }
  }


  function regisFunction(){
    $uName = $_POST["userName"];
    $uMatr = $_POST["userMatr"];
		$uPass = $_POST["userPassword"];
		$email = $_POST["email"];
    $logResponse = regisUser($uName, $uMatr, $uPass, $email);
    if ($logResponse["mess"] == "SUCCESS"){
      sessionStart($uName, $uMatr, '0');
      echo json_encode("New User Registered Succesfully");
    }else{
      genericErrorFunction($logResponse["mess"]);
    }
  }

  function genericErrorFunction($errorcode){
    switch($errorcode){
      case "500" :  header("HTTP/1.1 500 Bad connection, portal down. Sorry");
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

  function sessionStart($uName, $uMatr, $uRol){
    session_start();
    if (!isset($_SESSION['uName'])){
      $_SESSION['uName'] = $uName;
    }
    if (!isset($_SESSION['uMatr'])){
      $_SESSION['uMatr'] = $uMatr;
    }
    if (!isset($_SESSION['uRol'])){
      $_SESSION['uRol'] = $uRol;
    }
  }

  function getSession(){
    session_start();
  	if (isset($_SESSION['uName']) && isset($_SESSION['uMatr']) && isset($_SESSION['uRol']))
  	{
  		echo json_encode(array('uName' => $_SESSION['uName'], 'uMatr' => $_SESSION['uMatr'], 'uRol' => $_SESSION['uRol']));
  	}
  	else
  	{
  		genericErrorFunction("406a");
  	}
  }

  //&& isset($_SESSION['uMatr']) && isset($_SESSION['uRol'])

  function delSess(){
    session_start();
  	if (isset($_SESSION['uName']) && isset($_SESSION['uMatr']) && isset($_SESSION['uRol'])){
  		unset($_SESSION['uName']);
  		unset($_SESSION['uMatr']);
      unset($_SESSION['uRol']);
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

  function nThread(){
    $tBoard = $_POST["tBoard"];
    $tName = $_POST["tName"];

    $logResponse = createThread($tBoard, $tName);
    if ($logResponse["mess"] == "SUCCESS"){

      echo json_encode("New Thread Successfull");
    }else{
      genericErrorFunction($logResponse["mess"]);
    }
  }

?>
