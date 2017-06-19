<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset="utf-8">
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
						{foreach name=gamedata key=date item=match_day from=$myGameData}   <!--foreach($myGameData as $date => $match_day)-->
						{{assign var=i value=$match_day@total-1}}
						<tr class="more expanded" id={$more_id[$date]}><td colspan="6">{$date}</td></tr>
							{foreach name=match_name key=idx item=match from=$match_day}
								<tr class="moreContent more1">
									<td><span class="leaguname">{$match['leagueName']}</span> </td>
									<td><span class="vs"><span class="ht">{$match['ht']}</span>vs<span class="at">{$match['at']}</span></span></td>
									<td>{$match['time']|date_format:"%H:%M"}</td>

									{if $match['rq0'] == "NULL"}
										<td><span class="rq2">{$match['rq1']}</span></td>
									{else}
										<td><span class="rq1">{$match['rq0']}</span><span class="rq2">{$match['rq1']}</span></td>
									{/if}

									{if $match['odds3'] == ''}
										<td class="odds"><span>{$match['odds0']},</span>
																		 <span>{$match['odds1']},</span>
																		 <span>{$match['odds2']}</span></td>
									{else}
										<td class="odds"><span>{$match['odds0']},</span>
																		 <span>{$match['odds1']},</span>
																		 <span>{$match['odds2']},</span>
																		 <span>{$match['odds3']},</span>
																		 <span>{$match['odds4']},</span>
																		 <span>{$match['odds5']}</span></td>
									{/if}
									<td style="color:#ed3a37;">{$match['num']}人竞猜</td>
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



