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

  function attemptLogin($userName, $userPassword)
  {
    $connection = databaseConnection();

    if ($connection != null)
    {
      $sql = "SELECT * FROM Users WHERE username = '$userName' AND passwrd = '$userPassword'";
      $result = $connection->query($sql);

      if ($result->num_rows > 0)
      {
        while ($row = $result->fetch_assoc())
        {
          $response = array("uName"=>$row["username"], "uMatricula"=>$row["matricula"], "uRol"=>$row["rol"] , "MESSAGE"=>"SUCCESS");
        }

        $connection->close();
        return $response;
      }
      else
      {
        $connection->close();
        return array("MESSAGE"=>"406");
      }
    }
    else
    {
      return array("MESSAGE"=>"500");
    }

  }


  function regisUser($uName, $uMatr, $uPass, $email){
    $connection = databaseConnection();
    if ($connection != null){
      $sql = "SELECT * FROM Users WHERE username = '$uName'";
  		$result = $connection->query($sql);
  		if ($result->num_rows > 0){
        $connection->close();
        return array("mess"=>"409");
  		}else{
  			$sql = "INSERT INTO Users(username, matricula, passwrd, email, rol) VALUES  ('$uName', '$uMatr', '$uPass', '$email', '0')";
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

  function getBoard($bName){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Thread WHERE board = '$bName'";

      $result = $connection->query($sql);
  		$response = array();

  		if ($result->num_rows > 0){
  			while($row = $result->fetch_assoc()){
  				array_push($response, array("thread"=>$row["name"],"id"=>$row["id"]));
  			}

        $connection->close();
        return array("mess"=>"SUCCESS", "res"=>$response);
        return $response;

      }else{
        $connection->close();
        return array("mess"=>"406");
      }
    }else{
      return array("mess"=>"500");
    }
  }

  function getSearch($sValue){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Thread WHERE name LIKE '%" . $sValue . "%'";

      $result = $connection->query($sql);
  		$response = array();

  		if ($result->num_rows > 0){
  			while($row = $result->fetch_assoc()){
  				array_push($response, array("thread"=>$row["name"],"id"=>$row["id"]));
  			}

        $connection->close();
        return array("mess"=>"SUCCESS", "res"=>$response);
        return $response;

      }else{
        $connection->close();
        return array("mess"=>"406");
      }
    }else{
      return array("mess"=>"500");
    }
  }

  function getThreadName($tID){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Thread WHERE id = '$tID'";


      $result = $connection->query($sql);

  		if ($result->num_rows > 0){
  			while ($row = $result->fetch_assoc()){
          $response = array("tName"=>$row["name"],
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

  function getPosts($tID){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Post WHERE ThreadId = '$tID'";

      $result = $connection->query($sql);
  		$response = array();

  		if ($result->num_rows > 0){
  			while($row = $result->fetch_assoc()){
  				array_push($response, array("post"=>$row["content"],"username"=>$row["user"],"date"=>$row["fecha"]));
  			}

        $connection->close();
        return array("mess"=>"SUCCESS", "res"=>$response);
        return $response;

      }else{
        $connection->close();
        return array("mess"=>"406");
      }
    }else{
      return array("mess"=>"500");
    }
  }

  function getTips(){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Tips WHERE state = 1";

      $result = $connection->query($sql);
  		$response = array();

  		if ($result->num_rows > 0){
  			while($row = $result->fetch_assoc()){
  				array_push($response, array("post"=>$row["content"],"username"=>$row["user"],"date"=>$row["fecha"]));
  			}

        $connection->close();
        return array("mess"=>"SUCCESS", "res"=>$response);
        return $response;

      }else{
        $connection->close();
        return array("mess"=>"406");
      }
    }else{
      return array("mess"=>"500");
    }
  }

  function getPendientes(){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Tips WHERE state = 2";

      $result = $connection->query($sql);
  		$response = array();

  		if ($result->num_rows > 0){
  			while($row = $result->fetch_assoc()){
  				array_push($response, array("post"=>$row["content"],"username"=>$row["user"],"date"=>$row["fecha"],"id"=>$row["id"]));
  			}

        $connection->close();
        return array("mess"=>"SUCCESS", "res"=>$response);
        return $response;

      }else{
        $connection->close();
        return array("mess"=>"406");
      }
    }else{
      return array("mess"=>"500");
    }
  }

  function createThread($tBoard, $tName){
    $connection = databaseConnection();

    if ($connection != null){
      $sql = "SELECT * FROM Thread WHERE board = '$tBoard' AND name = '$tName'";
  		$result = $connection->query($sql);
  		if ($result->num_rows > 0){
        $connection->close();
        return array("mess"=>"409");
  		}else{
  			$sql = "INSERT INTO Thread(board, name) VALUES  ('$tBoard', '$tName')";
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


?>
