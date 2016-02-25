<?php
include "../../ini.php";

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
<title>添加课程</title>
	<link href="../css/css.css" rel="stylesheet" type="text/css" />
	<link href="../css/style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" charset="utf-8" src="../js/jquery2.1.1.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			 bindListenCh();
			 bindListenLess();
		})
		var ch='<div class="ch">第<input type="text" style="border:2px solid red;width:20px;" name="ch_id[]"/>章--<input type="text" style="border:2px solid red;width:100px;" name="ch_name[]"/><a href="javascript:addless()" >添加课时</a>-||-<a href="#" name="rmch">删除本章</a></div>';
		function addch(){
		 	$("#ch_table").append(ch);
	  		bindListener();
		}
		// 用来绑定事件(使用unbind避免重复绑定)
		function bindListenCh(){
			$("a[name=rmch]").unbind().click(function(){
			 	$(this).parent().remove();
			})
			
		}
		function bindListener(){
			$("a[name=rmch]").unbind().click(function(){
			 	$(this).parent().remove();
			})
			$("a[name=rmless]").unbind().click(function(){
			 	$(this).parent().remove();
			})
		}
	</script>
</head>
<body >
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
		    <td height="30">
		    	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr>
			          <td height="62" background="../images/nav04.gif">
					   <table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
			          </table></td>
			        </tr>
		    	</table>
		    </td>
		</tr>
	</table>
您的位置：<a href="#">工作台</a><span class="mr5 ml5">&gt;</span> 
科目管理<span class="mr5 ml5"> 添加课程&gt;</span> <br/>
<form action="savecourse.php" method="post" enctype="multipart/form-data" name="form" target="mainFrame" >
<div class="co">
	课程名:<input name="co_name" type="text" /><br/>
	设置章节：<a href="javascript:addch()" >添加章节</a>
	<div id="ch_table">
		<div class="ch">
			第<input type="text" style="border:2px solid red;width:20px;" name="ch_id[]"/>章--<input type="text" style="border:2px solid red;width:100px;" name="ch_name[]"/>
			<a href="javascript:addless()" >添加课时</a>-||-<a href="#" name="rmch">删除本章</a>
		</div>
	</div>
</div>
<div>
	<input type="submit" value="提交">
</div>
</form>
</body>
</html>


