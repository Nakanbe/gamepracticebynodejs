<?php
  $servername = "127.0.0.1";
  $username = "jingcai";
  $password = "kufa88";
  $dbname = "t1";
  $conn = new mysqli($servername, $username, $password, $dbname);
  if($conn->connect_error){
    die("connection failed: ". $conn->connect_error);
  }
  
  date_default_timezone_set('Asia/Taipei'); // 設定時區
  $conn->query("SET NAMES 'UTF8'"); //提醒MySQL在處理文字資料的時候，別忘了UTF-8的編碼
?>