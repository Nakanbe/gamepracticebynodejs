<?php
  
  function GetWebName() {
    include('dbconnect.php');

    $webquery = "SELECT id, name FROM web ORDER BY id";
    $result = $conn->query($webquery);
    $webname = array();
    
    while($row = $result->fetch_array(MYSQLI_ASSOC)){
      $webname[$row['id']] = $row['name'];
    }
    
    //print_r($webname);
    
    echo json_encode($webname);
  }
?>