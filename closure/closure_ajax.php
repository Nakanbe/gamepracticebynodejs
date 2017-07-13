<?php
  header('Content-Type: application/json; charset=UTF-8');
  $data = $_POST['data'];
  //print_r($_POST);
  $arr = array(1 => $data);
  echo json_encode($arr);
?>