<?php 
include("../ini.php");
include("../funs.php");
if (!empty($_POST)) {
	$name=$_POST['u_name'];
	$pwd=md5($_POST['u_pwd']);
	$class=$_POST['u_class'];
	$email=$_POST['u_email'];
	$tel=$_POST['u_tel'];
	$sql="INSERT INTO exam_user(u_name, u_pwd ,u_class,u_email,u_tel) VALUES (\"{$name}\",\"{$pwd}\",\"{$class}\",\"{$email}\",\"{$tel}\")";
	$re=$pdo->exec($sql);
	var_dump($sql);
	if($re){
		jumpUrl('user.php','添加成功');
	}
}

?>