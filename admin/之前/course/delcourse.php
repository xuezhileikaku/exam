<?php
include "../../ini.php";
header("Content-Type:text/html;charset=utf8;");
var_dump($_SESSION);
$co_id=$_SESSION['course'];
$sql="DELETE FROM exam_course WHERE co_id=$co_id";
$re=mysql_query($sql);

jumpurl("../right.php");