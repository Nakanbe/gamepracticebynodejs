<?php
  header('Content-Type: application/json; charset=UTF-8');
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
  
  // $webid = (int)$_POST['webid'];
  // $gametype = addslashes($_POST['gametype']);
  if(isset($_POST['webid'])){
    $webid = $_POST['webid'];
    $gametype = $_POST['gametype'];
  }
  $del_query= '';
  
  if(isset($_POST['gameid'])){  //當傳送gameid過來時表示要刪除資料
    if($_POST['gameid'] != -1){  //當gameid不是-1才是刪除
      $gameid = $_POST['gameid'];
      $del_query = "INSERT INTO chkSetResult (game_id) VALUES (". $gameid .")";
      $conn->query($del_query);
    }
    die();    
  }
  
  //---------------------------------------------------------------------------------
  //處理時間，先把現在時間減12小時，最後再加回來
  $now = DateTime::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));  //先轉成時間格式
  $now->sub(new DateInterval('PT12H'));  //減12小時
  $nowdate = $now->format('Y-m-d');  //轉成需要的格式
  $nowtime = $now->format('H:i:s');  
  //---------------------------------------------------------------------------------
  
  
  //---------------------------------------------------------------------------------
  //去gamer抓資料，最後資料會放在$gamer_rst_Arr[game_id, home_s, cust_s, start_dt, start_time]
  $gamerTable_query = "SELECT 
                        game_id, home_s, cust_s, start_dt, start_time
                       FROM
                        gamer
                       WHERE
                        ((start_dt = '".$nowdate."' AND start_time > '".$nowtime."') OR start_dt > '".$nowdate."')
                        AND
                        (cust_s != -1 AND home_s != -1)
                        AND
                        game_id NOT IN (SELECT game_id FROM chkSetResult)
                        AND
                        webid = ".$webid."
                        AND gtype = '".$gametype."'";
  $result = $conn->query($gamerTable_query);
  $gamer_rst_Arr = array();
  //echo $gamerTable_query;
  
  
  //把抓到的資料放到array裡
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    array_push($gamer_rst_Arr, $row);
  }  
  
  if(count($gamer_rst_Arr) == 0){  //若抓不到資料就回傳 NO DATA
    $tarr = array();
    // $tarr[0]['game_id'] = '';
    // $tarr[0]['home_s'] = '';
    // $tarr[0]['cust_s'] = '';
    // $tarr[0]['date_time'] = '';
    // $tarr[0]['home_name'] = '';
    // $tarr[0]['cust_name'] = '';
    // $tarr[0]['league_name'] = '';
    $tarr[0] = "NO DATA";
    echo json_encode($tarr);
    die();
  }
  //---------------------------------------------------------------------------------
    
  
  //---------------------------------------------------------------------------------
  //把需要的資料處理成字串
  $game_id_str = arr_to_str($gamer_rst_Arr, 'game_id');
 
  //利用game_id到game抓home_team和cust_team和league_id
  //最後資料會放在$game_rst_Arr[home_team, cust_team, league_id]
  $gameTable_query = "SELECT home_team, cust_team, league_id
                      FROM game
                      WHERE id IN (" . $game_id_str .")";
  $result = $conn->query($gameTable_query);
  $game_rst_Arr = array();
  // echo $gameTable_query;
  
  //把抓到的資料放到array裡
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    array_push($game_rst_Arr, $row);
  }
  //---------------------------------------------------------------------------------
  
  
  //---------------------------------------------------------------------------------
  //利用$game_rst_Arr[home_team]和$game_rst_Arr[cust_team]到team抓sname_c和id
  //先把home_team 和 cust_team處理成字串
  //最後資料會在$team_name_c_Arr
  $home_team_str = arr_to_str($game_rst_Arr, 'home_team');
  $cust_team_str = arr_to_str($game_rst_Arr, 'cust_team');
  
  //到資料庫抓資料
  $teamTable_query = "SELECT name_c, id FROM team WHERE id IN (".$home_team_str.",".$cust_team_str.")";
  $result = $conn->query($teamTable_query);
  // echo $teamTable_query;
  
  //把抓到的資料放到array裡 key value 和資料庫一樣
  $team_name_c_Arr = array(); 
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    $team_name_c_Arr[$row['id']] = $row['name_c'];
  }
  //---------------------------------------------------------------------------------
  
  
  //---------------------------------------------------------------------------------
  //利用$game_rst_Arr[league_id]到league抓name_c, id
  //最後資料會在$league_name_c_Arr
  $league_id_str = arr_to_str($game_rst_Arr, 'league_id');
  
  //到資料庫抓資料
  $leagueTable_query = "SELECT name_c, id FROM league WHERE id IN (".$league_id_str.")";
  $result = $conn->query($leagueTable_query);
  
  //把抓到的資料放到array裡  key value 和資料庫一樣
  $league_name_c_Arr = array();
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    $league_name_c_Arr[$row['id']] = $row['name_c'];
  }
  //---------------------------------------------------------------------------------
  
  
  //$gamer_rst_Arr, $game_rst_Arr, $team_name_c_Arr, $league_name_c_Arr
  // print_r($gamer_rst_Arr);  //game_id,start_dt,start_time
  // print_r($game_rst_Arr);
  // print_r($team_name_c_Arr); //name_c()
  // print_r($league_name_c_Arr);
  
  //組合資料並回傳
  //$finalresult = ['game_id', 'home_s', 'cust_s', 'date_time', 'home_name', 'cust_name', 'league_name']
  //3藍鳥隊 1小熊隊 4洋基隊 2紅襪隊
  $finalresult = array();
  for($i = 0; $i < count($gamer_rst_Arr); $i++){
    $finalresult[$i]['game_id'] = $gamer_rst_Arr[$i]['game_id'];
    $finalresult[$i]['home_s'] = $gamer_rst_Arr[$i]['home_s'];
    $finalresult[$i]['cust_s'] = $gamer_rst_Arr[$i]['cust_s'];
    //時間換算
    $date = DateTime::createFromFormat('Y-m-d H:i:s', $gamer_rst_Arr[$i]['start_dt'] .' '. $gamer_rst_Arr[$i]['start_time']);
    $interval = new DateInterval('PT12H');
    $date->add($interval);  //加12小時
    
    $finalresult[$i]['date_time'] = $date->format('Y-m-d H:i:s');
    $finalresult[$i]['home_name'] = $team_name_c_Arr[$game_rst_Arr[$i]['home_team']];
    $finalresult[$i]['cust_name'] = $team_name_c_Arr[$game_rst_Arr[$i]['cust_team']];
    $finalresult[$i]['league_name'] = $league_name_c_Arr[$game_rst_Arr[$i]['league_id']];
  }
  // print_r($finalresult);
  
  //轉成JSON
  $returndata = json_encode($finalresult);
  echo $returndata;
  
  
  
  function arr_to_str($arr, $key){
    $str = "";
    $tarr = array();
    for($i = 0; $i < count($arr); $i++){
      array_push($tarr, $arr[$i][$key]);
    }
    $str = implode(",", $tarr);
    return $str;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
?>