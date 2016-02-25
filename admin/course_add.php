<?php 
include("../ini.php");
include("../funs.php");
if (!empty($_POST)) {
 
	$name=$_POST['co_name'];
	$desc=$_POST['co_desc'];
	$cat=$_POST['co_cat'];
	$re=$pdo->exec("INSERT INTO exam_course (co_name, co_cat ,co_desc) VALUES (\"{$name}\",\"{$cat}\",\"{$desc}\")");
	if($re){
		jumpUrl('course.php','添加成功');
	}
}

?>

