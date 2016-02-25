<?php
include "../../ini.php";
header("Content-Type:text/html;charset=utf8;");
//print_r($_POST);
//exit();

$sql0="select co_id from exam_course";
$rows0=mysql_query($sql0);
$num=mysql_num_rows($rows0)+1;
$co_name=$_POST['co_name'];
foreach ($_POST['ch_name'] as $key => $value) {
	$co_id=$num."-".$key;
	$ch_name=$value;
	$sql2="INSERT INTO exam_course(co_id,co_name,ch_name) values('$co_id','$ch_name','$ch_name')";
	$re=mysql_query($sql2);
}



jumpurl("../right.php");

