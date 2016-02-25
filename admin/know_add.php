<?php
include("../ini.php");
include("../funs.php");
if (!empty($_POST)) {
	//var_dump($_POST);
	$name=$_POST['know_name'];
	$desc=$_POST['know_desc'];
	$id=$_POST['co'];
	$sql="INSERT INTO exam_know_bank (know_name,know_desc,co_id) VALUES (\"{$name}\",\"{$desc}\",\"{$id}\")";
	$re=$pdo->exec($sql);
	//var_dump($re);
	
	if($re){
		jumpUrl('course_det.php?id='.$id,"添加成功");
	}
}