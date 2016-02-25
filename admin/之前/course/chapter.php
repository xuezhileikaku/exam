<?php
include('../../ini.php');
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<title>章节列表</title>
</head>
<body>

请选择科目：
<?php
$sql = 'select * from course';
	$rowsk = mysql_query($sql);	
echo "<select>";
echo "<option value =\"moren\">"."请选择科目"."</option>";
$knum=mysql_num_rows($rowsk);
for ($i=0; $i <$knum ; $i++) {
	$rowk=mysql_fetch_assoc($rowsk); 
	$ke_id[$i]=$rowk['id'];
	echo "<option value =\"{$ke_id[$i]}\">".$rowk['ke_name']."</option>";
}
echo "</select>";
?>

<?php


$sql1 ='select zj_name from chapter where ke_id=2;';
	$rowsz = mysql_query($sql1);
	echo "<table>";
	for ($i=0; $i <mysql_num_rows($rowsz) ; $i++) { 
		$rowz=mysql_fetch_assoc($rowsz);
		echo "<tr><td>";
		echo $rowz['zj_name']."</td>";

		echo "</tr>";
	}
	echo "</table>";	
?>    

</body>
</html>>