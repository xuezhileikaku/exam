<?php
include "../../ini.php";
header("Content-Type:text/html;charset=utf8;");

?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<style type="text/css">
		body {margin-left: 0px;margin-top: 0px;margin-right: 0px;margin-bottom: 0px;
		}
	</style>
	<link href="../css/css.css" rel="stylesheet" type="text/css" />
</head>
<body>
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
您的位置：<a href="../index.php">工作台</a><span class="mr5 ml5">&gt;</span> 
科目管理<span class="mr5 ml5"> 编辑课程&gt;</span> <br/>
<form action="./delcourse.php" method="post">
<h1></h1>
<table align="center" id="course_dis">

	<tr>
		<td>课程编号</td>
		<td>课程</td>
		<td>选择操作的课程</td>
	
	</tr>
	<?php
var_dump($_SESSION);
$co_id=$_SESSION['course'];
$sql="select co_name from exam_course where co_id=$co_id";
$co_row=mysql_query($sql);
var_dump($co_row);

		$sql0 = "select co_id,co_name from exam_course";
		$rows0 =mysql_query($sql0);
		$course_num=mysql_num_rows($rows0);
		for ($i=0; $i <mysql_num_rows($rows0) ; $i++) { 
		    $arr[$i]=mysql_fetch_row($rows0);
		    echo "<tr id='$i'>";
		    echo "<td>{$arr[$i][0]}</td>";
		    echo "<td>{$arr[$i][1]}</td>";
		    echo "<td ><input type=\"radio\" name={$arr[$i][1]}></td>";
		    
		    echo "</tr>";
		}
	?>

</table>
<input type="submit" value="编辑" >
</form>
</body>
</html>