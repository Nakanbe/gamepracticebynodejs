<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset="utf-8">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="jingcai.css">
</head>
<body style="background-color: #003f74;">
	<div class="content">
		<div>
			<div class="contentWrap">
				<table class="gametable">
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
					<tbody>
					{*******************************************************************
						{foreach from=$myarray key="mykey" item="myitem"}, 
						$smarty.foreach.name.property
						這樣的寫法也是可以的，這是smarty2的寫法
					*******************************************************************}
						{foreach $myGameData as $date => $match_day}   <!--foreach($myGameData as $date => $match_day)-->
							{assign var=more value="more"}
							{assign "moreContent" "moreContent more"}
							<tr class="more expanded" id="{$more|cat:$match_day@index}" onclick="r({$match_day@index});">
								<td colspan="6"><span class="moreIcon"></span>{$date} 每次竞猜选择一个选项下注</td>
							</tr>
							{foreach $match_day as $match}
								<tr class="{$moreContent|cat:$match_day@index}">
									<td><span class="leaguname" style="background-color:{$color[$match.leagueName]}; color: #FFFFFF">{$match.leagueName}</span> </td>
									<td><span class="vs"><span class="ht">{$match.ht}</span>vs<span class="at">{$match.at}</span></span></td>
									<td>{$match.time|date_format:"%H:%M"}</td>

									{if $match.rq0 == "NULL"}
										<td><span class="rq2">{$match.rq1}</span></td>
									{else}
										<td><span class="rq1">{$match.rq0}</span><span class="rq2">{$match.rq1}</span></td>
									{/if}

									{if $match['odds3'] == ''}
										<td class="odds"><span>{$match.odds0}</span>
																		 <span>{$match.odds1}</span>
																		 <span>{$match.odds2}</span></td>
									{else}
										<td class="odds"><span>{$match.odds0}</span>
																		 <span>{$match.odds1}</span>
																		 <span>{$match.odds2}</span>
																		 <span>{$match.odds3}</span>
																		 <span>{$match.odds4}</span>
																		 <span>{$match.odds5}</span></td>
									{/if}
									<td style="color:#ed3a37;">{$match.num}人竞猜</td>
								</tr> 
							{/foreach}
						{/foreach}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>

{literal} 
	<script language="javascript"> 
	function r(i) {
    const str = ".moreContent.more" + i;
    const idstr = "#more" + i;
    $(str).slideToggle(0);
    $(idstr).toggleClass("expanded");
  }
	</script>
{/literal} 

