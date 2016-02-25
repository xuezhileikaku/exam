<?php
include("../ini.php");
include("../funs.php");
//var_dump($_POST);
if (!empty($_POST)) {
	$title=$_POST['ques_title'];
	$ans_a=$_POST['answer_a'];
	$ans_b=$_POST['answer_b'];
	$ans_c=$_POST['answer_c'];
	$ans_d=$_POST['answer_d'];
	$answer=$_POST['answer'];
	$analysis=$_POST['analysis'];
	$IRT_a=$_POST['IRT_a'];
	$IRT_b=$_POST['IRT_b'];
	$IRT_c=$_POST['IRT_c'];
	$id=$_POST['co'];
	$sql="INSERT INTO exam_ques_bank (ques_title, answer_a ,answer_b,answer_c,answer_d,answer,analysis,IRT_a,IRT_b,IRT_c,co_id) VALUES (\"{$title}\",\"{$ans_a}\",\"{$ans_b}\",\"{$ans_c}\",\"{$ans_d}\",\"{$answer}\",\"{$analysis}\",\"{$IRT_a}\",\"{$IRT_b}\",\"{$IRT_c}\",\"{$id}\")";
	$re=$pdo->exec($sql);

	
	if($re){
		jumpId('course_deta.php',$id);
	}
}