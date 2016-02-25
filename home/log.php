<?php
include("../ini.php");
include("../funs.php");
session_unset();

if (!empty($_POST)) {
	$email=$_POST['email'];
	$pwd=$_POST['pwd'];
	//var_dump($_POST);
	//echo md5($_POST['pwd']);
	$sql = "select * from exam_user where u_email=\"{$email}\"";
	$res=$pdo->query($sql);
	$res->setFetchMode(PDO::FETCH_ASSOC);
  	$re_arr = $res->fetchAll();
  	//var_dump($re_arr);
	if (!empty($re_arr)) {
		//echo substr($re_arr[0]['u_pwd'], 0,10)."输入密码：".substr(md5($_POST['pwd']),0,10);
		if (substr($re_arr[0]['u_pwd'], 0,10)==substr(md5($_POST['pwd']),0,10)) {
			$_SESSION['user']=$email;

			jumpUrl("course.php","登录成功");
		}else{
			echo "输入密码错误";
		}
	}else{
		echo "没有这个用户";
	}
}else{
		echo "用户名不能为空";
		exit();
}



