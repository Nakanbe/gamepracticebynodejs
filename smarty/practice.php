<?php
  include("dbconnect.php");
  //include("\shared\db.php");

  $conn = gamedb_conn();
  //抓網頁原始碼
  //$url = 'http://www.kufa88.com/Promotion/jingcai';
  // http://127.0.0.1/source4.html
  $url = 'http://127.0.0.1/source4.html';
  $line_array=file($url);
  $line_string=implode("", $line_array);
  $line_string =str_replace("\n", "", $line_string);
  
  //分析字串
  preg_match_all("/<table class=\"gameTable\">(.*?)<\/table>/", $line_string, $head);  //第一層
  //取日期
  preg_match_all("/<span class=\"moreIcon\"><\/span>(.*?) 每次/", $head[1][0], $date);
  
  $GameData = array();
  $colorarray = array();
  for($i = 1; $i <= count($date[1]); $i++){
    preg_match_all("/<tr class=\"moreContent more" . "$i" . ".*?row\">(.*?)<\/tr>/", $head[1][0], $tr);
    //key表示那一天的第幾場比賽
    foreach($tr[1] as $key => $value){
      //$GameData[$date[1][$i-1]][$key]['date'] = $date[1][$i-1];

      preg_match_all("/<span class=\"leagueName\".*?>(.*?)\s?<\/span>/", $value, $leagueName);  //leagueName
      $GameData[$date[1][$i-1]][$key]['leagueName'] = $leagueName[1][0];  //$GameData['2017-06-03'][0]['leagueName']

      preg_match_all("/<span class=\"ht\">(.*?)\s?<\/span>/", $value, $ht);  //ht
      $GameData[$date[1][$i-1]][$key]['ht'] = $ht[1][0];

      preg_match_all("/<span class=\"at\">(.*?)\s?<\/span>/", $value, $at);  //at
      $GameData[$date[1][$i-1]][$key]['at'] = $at[1][0];

      preg_match_all("/<td class=\"time\">(.*?)\s?<\/td>/", $value, $time);  //time
      $GameData[$date[1][$i-1]][$key]['time'] = $time[1][0] . ":00";

      preg_match_all("/<span>(.*?)\s+?<input.*?>/", $value, $odds);  //odds
      preg_match_all("/<span class=\"rq.*?>(.*?)\s?<\/span>/", $value, $rq); //rq1 + rq2
      
      //分析特別資料
      if(count($odds[1]) == 4){  //odds只有四筆資料
        //分析缺少那些資料
        $line_string3 = implode("", $odds[1]);  
        preg_match_all("/(.*?)\s+\d+.\d+/", $line_string3, $word);
        if($word[1][0] == "胜" && $word[1][1] == "负" && $word[1][2] == "胜" && $word[1][3] == "负"){
          $analyGame = "basketball1";
        }
        else if($word[1][0] == "胜" && $word[1][1] == "负" && $word[1][2] == "大" && $word[1][3] == "小"){
          $analyGame = "basketball2";
        }

        //籃球缺後面的資料 所以rq[1][2] and odds[1][4] and odds[1][5] 沒有資料 缺大小
        if($analyGame == "basketball1"){
          $rq[1][2] = "NULL";
          $odds[1][4] = "";
          $odds[1][5] = "";
        }

        //籃球缺中間的資料 所以rq[1][1] and odds[1][2] and odds[1][3] 沒有資料 缺勝負
        else if($analyGame == "basketball2"){
          //
          $rq[1][2] = $rq[1][1];
          $rq[1][1] = "NULL";
          for($j = 2; $j <= 3; $j++){
            $odds[1][$j+2] = $odds[1][$j];
            $odds[1][$j] = "";
          }
        }
      }
      
      //足球缺前面的資料 所以rq[1][0] and odds[1][0] and odds[1][1] and odds[1][2] 沒有資料
      if(count($odds[1]) == 3){  //odds只有三筆資料 
        $rq[1][1] = $rq[1][0];
        $rq[1][0] = "NULL";
        for($j = 3; $j <= 5; $j++){
          $odds[1][$j] = "";
        }
      }
      
      //把處理好的資料放進陣列裡
      for($j = 0; $j < count($rq[1]); $j++){
        $rqstr = 'rq' . $j;
        $GameData[$date[1][$i-1]][$key][$rqstr] = $rq[1][$j];  //rq0, rq1
      }
      for($j = 0; $j < count($odds[1]); $j++){
        $oddsstr = 'odds' . $j;
        $GameData[$date[1][$i-1]][$key][$oddsstr] = $odds[1][$j];  //odds0 ,odds1, odds2, odds3, odds4, odds5 
      }

      preg_match_all("/<td class=\"num\".*?>([\d]+).*?<\/td>/", $value, $num); //num
      $GameData[$date[1][$i-1]][$key]['num'] = $num[1][0];

      preg_match_all("/<td><span class=\"leagueName\" style=\"background-color: (.*?);/", $value, $color);
      $colorarray[$leagueName[1][0]] = $color[1][0];
      //<td><span class="leagueName" style='background-color: #22C126; color: #ffffff'>J2联赛</span></td>
    }
  }
  // style='background-color: #C58788; color: #ffffff'>世青赛
  // style='background-color: #336600; color: #ffffff'>世界杯预
  // style='background-color: #336699; color: #ffffff'>阿根廷杯
  // style='background-color: #327E7C; color: #FFFFFF'>国际赛
  // style='background-color: #336699; color: #FFFFFF'>巴西甲
  // background-color: #22C126; color: #ffffff'>J2联赛
  // $colorarr = array('世青赛' => '#C58788',
  //                   '世界杯预' => '#336600',
  //                   '阿根廷杯' => '#336699',
  //                   '国际赛' => '#327E7C',
  //                   '巴西甲' => '#336699',
  //                   '韩足总杯' => '#354896',
  //                   'J2联赛' => '#22C126');
  
  //$query = "INSERT INTO betgame (bet_date, bet_leaguname, bet_ht, bet_at, bet_time, bet_rq0, bet_rq1, bet_odds0, 
  //                               bet_odds1, bet_odds2, bet_odds3, bet_odds4, bet_odds5, bet_num)
  //                       VALUES ('2017-06-03', '歐冠', '皇家馬德里', '巴塞隆納', 0, -1, '胜 2.11', '平 3.0', '负 2.36',
  //                              '胜 1.36', '平 2.35', '负 2.5', '1235')";
  $querystr = "INSERT INTO betgame (bet_date, bet_leaguname, bet_ht, bet_at, bet_time, bet_rq0, bet_rq1, bet_odds0, bet_odds1, bet_odds2, bet_odds3, bet_odds4, bet_odds5, bet_num) VALUES ";  //INSTERT string
  $flag = 0; //是否要INSERT
  foreach($GameData as $key => $value){ //$value為陣列，內容是$key這一天裡的所有比賽
    foreach($value as $key2 => $value2){ //哪場比賽 $value2為陣列，內容是一場比賽裡的所有資料
      //取出符合要求的資料，用來比較是否要更新資料，
      $queryselect = "SELECT 
                        bet_odds0 as odds0, 
                        bet_odds1 as odds1, 
                        bet_odds2 as odds2, 
                        bet_odds3 as odds3, 
                        bet_odds4 as odds4, 
                        bet_odds5 as odds5, 
                        bet_num as num, 
                        bet_ID                                           
                      FROM 
                        betgame 
                      WHERE 
                        bet_date = '" . $key . "' AND 
                        bet_leaguname = '" . $value2['leagueName'] . "' AND 
                        bet_ht = '" . $value2['ht'] . "' AND 
                        bet_at = '" . $value2['at'] . "' AND
                        bet_time = '" . $value2['time'] . "'";
      $result = gamedb_execute($queryselect,$conn); //執行SQL

      if($row = $result->fetch_array(MYSQLI_ASSOC)){ //當有找到資料時進行比對，沒有時進行INSERT
        if($row['odds0'] != $value2['odds0'] || $row['odds1'] != $value2['odds1'] || $row['odds2'] != $value2['odds2'] ||
           $row['odds3'] != $value2['odds3'] || $row['odds4'] != $value2['odds4'] ||
           $row['odds5'] != $value2['odds5'] || $row['num'] != $value2['num']){
          $queryupdate = "UPDATE 
                            betgame
                          SET
                            bet_odds0='" . $value2['odds0'] . "',
                            bet_odds1='" . $value2['odds1'] . "',
                            bet_odds2='" . $value2['odds2'] . "',
                            bet_odds3='" . $value2['odds3'] . "',
                            bet_odds4='" . $value2['odds4'] . "',
                            bet_odds5='" . $value2['odds5'] . "',
                            bet_num=" . $value2['num'] . "
                          WHERE
                            bet_ID=" . $row['bet_ID'];
          gamedb_execute($queryupdate,$conn);//執行SQL
        }
      }
      else{
        //組合要INSERT的資料
        $querystr .= "('" . $key . "','" . $value2['leagueName'] . "','" .
                                           $value2['ht'] . "','" .
                                           $value2['at'] . "','" .
                                           $value2['time'] . "'," .
                                           $value2['rq0'] . "," .
                                           $value2['rq1'] . ",'" .
                                           $value2['odds0'] . "','" .
                                           $value2['odds1'] . "','" .
                                           $value2['odds2'] . "','" .
                                           $value2['odds3'] . "','" .
                                           $value2['odds4'] . "','" .
                                           $value2['odds5'] . "'," .
                                           $value2['num'] . "),";
        $flag = 1; 
      }
    }
  }
  $querystr = substr($querystr,0,-1); //去除最後一個逗號
  if($flag == 1){
    gamedb_execute($querystr,$conn);//執行SQL
  }

  //印出TABLE
  
  $todaydate = ""; //今天日期
  $changedate = 1;
  //選擇要顯示出來的比賽
  // $queryoutput = 'SELECT * 
  //                 FROM betgame 
  //                 WHERE (bet_date="' . date('Y-m-d') . '" AND bet_time>"' . date('H:i:s') . '") OR ' . 
  //                       'bet_date>"' . date('Y-m-d') . '" 
  //                 ORDER BY bet_date ASC, bet_time ASC';
  $queryoutput = 'SELECT * 
                  FROM betgame 
                  WHERE (bet_date>="2017-05-09" AND bet_date<="2017-05-11") 
                  ORDER BY bet_date ASC, bet_time ASC';
  $result = gamedb_execute($queryoutput,$conn);//執行SQL
  $outputstr = "<table class='gametable'>
                  <thead>
                    <tr>
                      <th width='100'>賽事</th>
                      <th width='200'>&nbsp;&nbsp;主隊&nbsp;&nbsp;&nbsp;vs&nbsp;&nbsp;&nbsp;客隊&nbsp;&nbsp;</th>
                      <th width='80'>截止</th>
                      <th>讓球</th>
                      <th width='300'>主勝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;平局&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客勝</th>
                      <th width='150'>競猜人數</th>
                    </tr>
                  </thead>
                  <tbody>";
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    //leaguname, ht, at, time, rq1, rq2
    if($row['bet_date'] != $todaydate){ //日期不一樣時就要加這些HTML
      $outputstr .=
        '<tr class="more expanded" id="more'."$changedate".'" style="border-top: 0;" onclick="r('."$changedate".');">
          <td colspan="6"><span class="moreIcon"></span>' . $row['bet_date'] . ' 每次竞猜选择一个选项下注</td>
        </tr>';
      $todaydate = $row['bet_date'];
      $changedate++;
    }
    $outputstr .= 
      '<tr class="moreContent more' . ($changedate-1) . '">'.
        '<td><span class="leaguname" style="background-color:' . $colorarray[$row['bet_leaguname']] . '; color: #FFFFFF">' . $row['bet_leaguname'] . '</span> </td>
        <td><span class="vs"><span class="ht">' . $row['bet_ht'] . '</span>vs<span class="at">' . $row['bet_at'] . '</span></span></td>
        <td>' . substr($row['bet_time'], 0, 5) . '</td>';
    if($row['bet_rq1'] < 0){ //rq1 < 0 時為綠色
      $rqcolor = "green";
    }
    else{  //rq1 > 0 時為紅色
      $rqcolor = 'red';
      $row['bet_rq1'] = '+' . $row['bet_rq1'];
    }
    if($row['bet_rq0'] == ''){  //沒有資料就不印出來了
      $outputstr .= '<td><span class="rq2" style="color:'. $rqcolor .';">' . $row['bet_rq1'] . '</span></td>';
    }
    else{
      $outputstr .= '<td><span class="rq1">' . $row['bet_rq0'] . '</span><span class="rq2" style="color:'.    $rqcolor .';">' . $row['bet_rq1'] . '</span></td>';
    }
    if($row['bet_odds3'] == ""){ //沒有資料就不印出來了
      $outputstr .=
      '<td class="odds"><span>' . $row['bet_odds0'] . '</span>
                        <span>' . $row['bet_odds1'] . '</span>
                        <span>' . $row['bet_odds2'] . '</span></td>';
    }
    else{
      $outputstr .=
      '<td class="odds"><span>' . $row['bet_odds0'] . '</span>
                        <span>' . $row['bet_odds1'] . '</span>
                        <span>' . $row['bet_odds2'] . '</span>
                        <span>' . $row['bet_odds3'] . '</span>
                        <span>' . $row['bet_odds4'] . '</span>
                        <span>' . $row['bet_odds5'] . '</span></td>';
    }
    
    $outputstr = $outputstr .'<td style="color:#ed3a37;">' . $row['bet_num'] . '人竞猜</td>
      </tr>';
  }
  $outputstr .= " </tbody></table>";
  // <table>
  //   <thead>
  //     <tr>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     <tr>
  //       <td>$row['bet_leaguname']</td>
  //       <td>$row['bet_ht'] vs $row['bet_at']</td>
  //       <td>$row['bet_time']</td>
  //       <td>$row['bet_rq0'] $row['bet_rq1']</td>
  //       <td>$row['bet_odds0'] $row['bet_odds1'] $row['bet_odds2'] $row['bet_odds3'] $row['bet_odds4'] $row['bet_odds5']</td>
  //       <td>$row['bet_num']</td>
  //     </tr>
  //   </tbody>
  // </table>
  // echo $outputstr;
  gamedb_close($conn);//執行SQL

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="jingcai.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <title>JINGCAI</title>

</head>
<body style="background-color: #003f74;"">
  <div class="content">
    <div>
      <div class="contentWrap">
        <?php echo $outputstr; ?>
      </div>
    </div>
  </div>
</body>
</html>

<script>
  function r(i) {
    const str = ".moreContent.more" + i;
    const idstr = "#more" + i;
    $(str).slideToggle(0);
    $(idstr).toggleClass("expanded");
  }

</script>