<?php
  header('Content-Type: application/json; charset=UTF-8');
  include('dbconnect.php');
  
  $webquery = "SELECT name FROM web ORDER BY id";
  $result = $conn->query($webquery);
  $webname = array();
  
  $i = 1;
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    $webname[$i] = $row['name'];
    $i++;
  }
  
  //print_r($webname);
  
  echo json_encode($webname);
?>