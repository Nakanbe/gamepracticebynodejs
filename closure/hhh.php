<?php
  //$a = array('a','b','c','d','e','f');
  $a = array();
  
  for($i = 0; $i < 10; $i++){
    $a[$i] = array();
    array_push($a[$i],$i);
  }
  print_r($a);
  
  function addc($carry, $item){
    $carry .= $item. ',';
    return $carry;
  }
  
  function addcomma($arr, $key){
    $str = '';
    for($i = 0; $arr[$i]; $i++){
      $str .= $arr[$i][$key] . ',';
    }

    return substr($str,0,-1);
  }
  
  echo array_reduce($a[$i-1], 'addc');
  echo addcomma($a, '0')
?>