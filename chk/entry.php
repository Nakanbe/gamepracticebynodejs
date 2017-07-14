<?php
  header('Content-Type: application/json; charset=UTF-8');
  $entry = $_POST;
  //print_r($entry);
  switch($entry['gate']){
    case 'get':
    case 'auto':
      include('getgame.php');
      GetData($entry['webid'], $entry['gametype']);
      break;
    case 'delete':
      include('getgame.php');
      DeleteGame($entry['gameid']);
      break;
    case 'getweb':
      include('webname.php');
      GetWebName();
      break;
    default:
      echo 'Error Entry.';
      break;
  }
?>