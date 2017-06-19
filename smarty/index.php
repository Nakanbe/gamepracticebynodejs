<?php
	require('libs/smarty.class.php');  //先設定smarty.class.php的路徑
	$smarty = new Smarty;

  // 設定路徑
	$smarty->template_dir = 'F:/xampp/htdocs/smarty/templates/';
	$smarty->compile_dir = 'F:/xampp/htdocs/smarty/templates_c/';
	$smarty->config_dir = 'F:/xampp/htdocs/smarty/configs/';
	$smarty->cache_dir = 'F:/xampp/htdocs/smarty/cache/';
	// echo dirname(__FILE__);
	// F:\xampp\htdocs\smarty


	//-----------------------------抓取網頁資料---------------------------------------------------------------

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

      // preg_match_all("/<td><span class=\"leagueName\" style='background-color: (.*?);/", $value, $color);
      // $colorarray[$leagueName[1][0]] = $color[1][0];
      //<td><span class="leagueName" style='background-color: #22C126; color: #ffffff'>J2联赛</span></td>

      //$GameData['2017-06-03'][0]['leagueName']
    }
  }

  //----------------------------------------抓取結束---------------------------------------------------------
  //會有$GameData

  // print_r($GameData);

  $more_id = array();

  $i = 0;
  foreach($GameData as $key => $value){
  	$more_id[$key] = 'more'.($i+1);
  	$i++;
  }

  
  

  $smarty->assign('myGameData', $GameData);
  $smarty->assign('more_id', $more_id);

  $smarty->display('index.tpl');

?>