<?php
header("content-type:text/html;charset=utf8;");
	echo "程序开始时间".$stime=microtime(true); //获取程序开始执行的时间
	echo "<br/>";
	include("ini.php");
	$obm=new matrix();
	//知识点开始的kp_id
	$a=5;
	//知识点结束的kp_id
	$b=10;
	//数据库中获取知识点
$sql = "select * from zhishidian where kp_id between {$a} and {$b};";
	$rows= mysql_query($sql);
	$arr_a=array_fill(0, $b-$a+1, array_fill(0, $b-$a+1, 0));
	//根据知识点的数目建立矩阵
for ($i=$a; $i <$b+1; $i++) { 
	$row = mysql_fetch_assoc($rows);
	$arr[$i-$a][]=(int)substr($row['knowledgeID'],-2,2);
	$arr[$i-$a][]=(int)substr($row['pid'], -2,2);	
}

//根据arr的对应关系设置arr_a的值
foreach ($arr as $key => $value) {
	$tmp=$arr[$key][1];
	if ($tmp!==0) {
		$arr_a[$tmp-1][$key]=1;
	}	
}
$obm->display($arr_a,"A矩阵");
$arr_r=$obm->arrR($arr_a,$max=10);
$obm->display($arr_r,"R矩阵");
$arr_d=$obm->ideKnow($arr_r);
$obm->display($arr_d,"典型考核模式");
echo "程序结束时间".$etime=microtime(true);//获取程序执行结束的时间
	echo "<br/>";
$total=$etime-$stime;   //计算差值
	echo "<br />{$total} seconds";
?>


