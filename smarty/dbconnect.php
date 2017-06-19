<?php
  // $servername = "127.0.0.1";
  // $username = "jingcai";
  // $password = "kufa88";
  // $dbname = "game";
  
  function gamedb_conn(){
  	$servername = "127.0.0.1";
  	$username = "root";
  	$password = "admin";
  	$dbname = "game";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if($conn->connect_error){
  		die("Connection failed: " . $conn->connect_error);
  	}
  	date_default_timezone_set('Asia/Taipei'); // 設定時區
  	$conn->query("SET NAMES 'UTF8'");  //提醒MySQL在處理文字資料的時候，別忘了UTF-8的編碼
    return $conn;
  }

  
  // $conn = new mysqli($servername, $username, $password, $dbname);

  // if($conn->connect_error){
  // 	die("Connection failed: " . $conn->connect_error);
  // } 

  // date_default_timezone_set('Asia/Taipei'); // 設定時區
  // $conn->query("SET NAMES 'UTF8'");  //提醒MySQL在處理文字資料的時候，別忘了UTF-8的編碼

  function gamedb_execute($sql, $conn){
  	// global $conn;
  	$result = $conn->query($sql);
  	return $result;
  }

  function gamedb_close($conn){
  	// global $conn;
  	$conn->close();
  }
?>