<?php
//跳转函数
function jumpUrl($path,$mess){
	echo $mess;
	echo "<script language='javascript'> location.href='".$path."' </script>";
}
?>