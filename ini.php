<?php
header("Content-Type:text/html;charset=utf8;");
//开启session
session_start();
$config = array('server' => 'localhost', 
	'user' =>'root',
	'pwd' =>'',
	'db' =>'exam',
	'charset'=>'utf8',
	'persistency'=>'true'
	);
$pdo=new PDO("mysql:host={$config['server']};dbname={$config['db']}", $config['user'], $config['pwd']);
$pdo->query("SET NAMES utf8");

/*
include "class/matrix.php";
include "class/personality.php";
//自动加载类

session_start();

$matrix=new matrix();*/

