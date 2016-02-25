<?php
include("../ini.php");
$str="12,132423,235,12，3，34，21<br/>";
echo $str;
echo str_replace(",", "，", $str);
echo $str;
echo str_replace("，", ",", $str);
