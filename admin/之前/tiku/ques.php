<?php
include("../../ini.php");
$sql0 = "select co_id,co_name from exam_course";
$rows0 =mysql_query($sql0);
$course_num=mysql_num_rows($rows0);
//var_dump($_POST);
if (!empty($_POST)) {
	$coid=$_POST['course'];
}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<title>无标题</title>
	<link href="../css/css.css" rel="stylesheet" type="text/css" />
<link href="../css/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="top">
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
		
	<tr>
    	<td>
	    	<table id="subtree1" style="DISPLAY: " width="100%" border="0" cellspacing="0" cellpadding="0">
	        <tr>
	          <td><h3>
			您的位置：<a href="#">工作台</a><span class="mr5 ml5">&gt;</span> 
			试题管理<span class="mr5 ml5"> &gt;</span> </h3>
	          
	          	<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
	              <tr>
	                <td height="40" class="font42">
						<table width="100%" border="0" cellpadding="4" cellspacing="1" bgcolor="#464646" class="newfont03">
							<tr class="CTitle" >
			                    <td height="22" colspan="8" align="center" style="font-size:16px">
			                    <form action="ques.php" method="post">
									<select name="course">
										<option value="0">请选择课程</option>
										<?php
											for ($i=0; $i <$course_num ; $i++) {
												$arr[]= mysql_fetch_array($rows0);
												echo $co_id=$arr[$i][0]; 
												echo "<option value='$co_id'>{$arr[$i][1]}</option>";
											}
											?>
									</select>
									<input type="submit" value="选择"/>
								</form>
								</td>
			                </tr>
			                <tr bgcolor="#EEEEEE" align='center'>
			                    <td width="5%">课程ID</td>
								<td width="5%">试题ID</td>
			                    <td width="20%">题目</td>
			                    <td width="20%">选项</td>
			                    <td width="20%">答案</td>
								<td width="20%">知识点</td>
								<td width="10%">操作</td>
			                </tr>
			                <?php
			                if (!empty($coid)) {
			                	$sql1="select * from exam_ques_bank where co_id=$coid";
			                	$rows1 = mysql_query($sql1);
			                	while ($row1= mysql_fetch_assoc($rows1)){
			                		echo "<tr bgcolor='#fff' align='center'>
										<td >$row1[co_id]||$row1[ch_id]</td>
										<td >$row1[ques_id]</td>
					                    <td >$row1[ques_title]</td>
					                    <td >A:$row1[answer_a]<br/>
											B:$row1[answer_b]<br/>
											C:$row1[answer_c]<br/>
											D:$row1[answer_d]
					                    </td>
					                    <td >$row1[answer]</td>
					                    <td >$row1[know_strategy]</td>
			                			<td><a >修改 </a>| <a>删除</a></td>
			                		</tr>";
			                	}
			                }else{
			                	echo "<p >请选择课程</p>";
			                }
			                	
			                ?>
	            		</table>
	            	</td>
	        	  </tr>
	      		</table>
       			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
			        <tr>
			          <td height="6"><img src="../images/spacer.gif" width="1" height="1" /></td>
			        </tr>
			        <tr>
			          <td height="33"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="right-font08">
			        <tr>
			            <td width="50%">共 <span class="right-text09">5</span> 页 | 第 <span class="right-text09">1</span> 页</td>
			            <td width="49%" align="right">[<a href="#" class="right-font08">首页</a> | <a href="#" class="right-font08">上一页</a> | <a href="#" class="right-font08">下一页</a> | <a href="#" class="right-font08">末页</a>] 转至：</td>
			            <td width="1%"><table width="20" border="0" cellspacing="0" cellpadding="0">
			        <tr>
			            <td width="1%"><input name="textfield3" type="text" class="right-textfield03" size="1" /></td>
			            <td width="87%"><input name="Submit23222" type="submit" class="right-button06" value=" " />
			            </td>
			        </tr>
		    	</table>
    		   </td>
            </tr>
        </table>
        </td>
        </tr>
      </table> 
  	</td>
  </tr>
</table>
</div>

<div id="choose" align="center">

</div>






</body>
</html>