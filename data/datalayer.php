<?php
  function databaseConnection(){
    $servername = "localhost";
  	$username = "root";
  	$password = "root";
  	$dbname = "TecChan";

  	$conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error){
  		return null;
  	}else{
      return $conn;
    }
  }

  function attemptLogin($user, $pass){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Users WHERE username = '$user' AND passwrd = '$pass'";

      $result = $connection->query($sql);

  		if ($result->num_rows > 0){
  			while ($row = $result->fetch_assoc()){
          $response = array("fName"=>$row["fName"],
  													"lName"=>$row["lName"],
                            "mess"=>"SUCCESS");
  			}

        $connection->close();
        return $response;

  		}else{
        $connection->close();
        return array("mess"=>"406");
      }
    }else{
      return array("mess"=>"500");
    }
  }

  function regisUser($fName, $lName, $uName, $uPass, $email, $gender, $country){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Users WHERE username = '$uName'";

  		$result = $connection->query($sql);

  		if ($result->num_rows > 0){
        $connection->close();
        return array("mess"=>"409");

  		}else{
  			$sql = "INSERT INTO Users(fName, lName, username, passwrd, email, gender, country) VALUES  ('$fName', '$lName', '$uName', '$uPass', '$email', '$gender', '$country')";
  			if (mysqli_query($connection, $sql)){
          $response = array("mess"=>"SUCCESS");

          $connection->close();
          return $response;
  			}else{
          $connection->close();
  				return array("mess"=>"500");
  			}
  		}
    }else{
      return array("mess"=>"500");
    }
  }

  function getComments(){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Comments";

  		$result = $connection->query($sql);
  		$response = array();
  		if ($result->num_rows > 0){
  			while($row = $result->fetch_assoc()){
  				array_push($response, array("user"=>$row["username"],"com"=>$row["comment"]));
  			}

        $connection->close();
        return array("mess"=>"SUCCESS", "res"=>$response);

      }else{
        $connection->close();
        return array("mess"=>"406");
      }
    }else{
      return array("mess"=>"500");
    }
  }

  function getProfile(){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Users WHERE username = 'mikematute'";

      $result = $connection->query($sql);

      if ($result->num_rows > 0){
  			while($row = $result->fetch_assoc()){
  				$response = array("firstName"=>$row["fName"],
  													"lastName"=>$row["lName"],
  													"username"=>$row["username"],
  													"email"=>$row["email"],
  													"gender"=>$row["gender"],
  													"country"=>$row["country"],
                            "mess"=>"SUCCESS");
  			}

        $connection->close();
        return $response;

  		}else{
        $connection->close();
        return array("mess"=>"406");
      }
    }else{
      return array("mess"=>"500");
    }
  }


?>
