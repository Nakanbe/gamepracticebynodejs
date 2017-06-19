<?php
/* Smarty version 3.1.30, created on 2017-06-19 12:22:21
  from "F:\xampp\htdocs\smarty\templates\index.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5947a5dd3d3cf6_59910933',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'af11c02e9e29e8623fe65ca3a0ce5fe55c4339bf' => 
    array (
      0 => 'F:\\xampp\\htdocs\\smarty\\templates\\index.tpl',
      1 => 1497867737,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5947a5dd3d3cf6_59910933 (Smarty_Internal_Template $_smarty_tpl) {
if (!is_callable('smarty_modifier_date_format')) require_once 'F:\\xampp\\htdocs\\smarty\\libs\\plugins\\modifier.date_format.php';
?>
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
						<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['myGameData']->value, 'match_day', true, 'date', 'gamedata', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['date']->value => $_smarty_tpl->tpl_vars['match_day']->value) {
$__foreach_match_day_0_saved = $_smarty_tpl->tpl_vars['match_day'];
?>   <!--foreach($myGameData as $date => $match_day)-->
						<?php ob_start();
$_smarty_tpl->_assignInScope('i', $_smarty_tpl->tpl_vars['match_day']->total-1);
$_prefixVariable1=ob_get_clean();
echo $_prefixVariable1;?>

						<tr class="more expanded" id=<?php echo $_smarty_tpl->tpl_vars['more_id']->value[$_smarty_tpl->tpl_vars['date']->value];?>
><td colspan="6"><?php echo $_smarty_tpl->tpl_vars['date']->value;?>
</td></tr>
							<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['match_day']->value, 'match', false, 'idx', 'match_name', array (
));
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['idx']->value => $_smarty_tpl->tpl_vars['match']->value) {
?>
								<tr class="moreContent more1">
									<td><span class="leaguname"><?php echo $_smarty_tpl->tpl_vars['match']->value['leagueName'];?>
</span> </td>
									<td><span class="vs"><span class="ht"><?php echo $_smarty_tpl->tpl_vars['match']->value['ht'];?>
</span>vs<span class="at"><?php echo $_smarty_tpl->tpl_vars['match']->value['at'];?>
</span></span></td>
									<td><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['match']->value['time'],"%H:%M");?>
</td>

									<?php if ($_smarty_tpl->tpl_vars['match']->value['rq0'] == "NULL") {?>
										<td><span class="rq2"><?php echo $_smarty_tpl->tpl_vars['match']->value['rq1'];?>
</span></td>
									<?php } else { ?>
										<td><span class="rq1"><?php echo $_smarty_tpl->tpl_vars['match']->value['rq0'];?>
</span><span class="rq2"><?php echo $_smarty_tpl->tpl_vars['match']->value['rq1'];?>
</span></td>
									<?php }?>

									<?php if ($_smarty_tpl->tpl_vars['match']->value['odds3'] == '') {?>
										<td class="odds"><span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds0'];?>
,</span>
																		 <span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds1'];?>
,</span>
																		 <span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds2'];?>
</span></td>
									<?php } else { ?>
										<td class="odds"><span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds0'];?>
,</span>
																		 <span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds1'];?>
,</span>
																		 <span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds2'];?>
,</span>
																		 <span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds3'];?>
,</span>
																		 <span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds4'];?>
,</span>
																		 <span><?php echo $_smarty_tpl->tpl_vars['match']->value['odds5'];?>
</span></td>
									<?php }?>
									<td style="color:#ed3a37;"><?php echo $_smarty_tpl->tpl_vars['match']->value['num'];?>
人竞猜</td>
								</tr> 
							<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

						<?php
$_smarty_tpl->tpl_vars['match_day'] = $__foreach_match_day_0_saved;
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>



<?php }
}
