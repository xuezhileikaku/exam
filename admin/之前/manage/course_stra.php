<?php
include "../../ini.php";
$sql0 = "select co_id,co_name from exam_course";
$rows0 =mysql_query($sql0);
$course_num=mysql_num_rows($rows0);
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
	<script type="text/javascript">
	var select="";

	</script>
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
您的位置：<a href="#">工作台</a><span class="mr5 ml5">&gt;</span> 
管理<span class="mr5 ml5"> 设置策略&gt;</span> <br/>

	<div class="co" align="center">
		<form action="course_stra.php" method="post" enctype="multipart/form-data" name="form" target="mainFrame" >
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
		<?php
if (isset($coid)) {
			$sql1 = "select co_name from exam_course where co_id=$coid";
			$row1=mysql_query($sql1);
			$arr1[]= mysql_fetch_array($row1);
			$co_name=$arr1[0][0];
			$sql2 = "select know_num,know_name from exam_know_bank where co_id=$coid";
			$row2=mysql_query($sql2);
			while ( $row= mysql_fetch_row($row2)) {
				$arr2[]=$row;
			}
			echo "<br/>";
			//var_dump($arr2);
			//echo "<br/>";
			$num=count($arr2);
			echo "<h1>{$co_name}一共有{$num}个知识点</h1>";
?>
<form action="test.php" method="post" enctype="multipart/form-data" name="form1" target="mainFrame" >
<table border="2px">
	<tr>
		<td colspan="3"><h3>课程名：<?php echo $co_name?></h3></td>
	</tr>
	<tr>
		<td>知识点编号</td>
		<td>知识点</td>
	</tr>
	<?php
	for ($i=0; $i <$num; $i++) { 
		echo "<tr><td>{$arr2[$i][0]}</td>";
		echo "<td>{$arr2[$i][1]}</td>";
	}
}else{
	echo "<h1>请选择要设置策略的课程</h1>";
}		
	?>
</table>		
</div>	
</form>
<div id="know_sort">
<h1 >设置知识点顺序</h1>

</div>

</body>
</html>
