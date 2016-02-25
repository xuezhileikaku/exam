<?php
//测试试题总数
	$q =$_SESSION['test_num'];
	//统计测试的试题
	
	//实例化
	$preson=new personality();
	
	//用户选择的答案
	$choice=$_POST['react'];
	//存储测试题的编号
	$_SESSION['test']['tested'][]= $ques_id;
	$_SESSION['test']['irta']= $_POST['irta'];
	$_SESSION['test']['irtb']= $_POST['irtb'];
	$_SESSION['test']['itrc']= $_POST['irtc'];
	$sql = "select answer from ques_bank where ques_id ='$ques_id'";
	$rows = mysql_query($sql);
	$aa=array();
	$a=$_SESSION['test']['irta'];
	$b=$_SESSION['test']['irtb'];
	$c=$_SESSION['test']['itrc'];
	while ($row = mysql_fetch_assoc($rows)){
		$aa[] = $row['answer'];
	}
	$tested=$_SESSION['tested'];
	if($aa[0] == $choice){
		echo "答对";
		$_SESSION['right'][]=$ques_id;
		$answer=1;
		//计算能力值theta
		$th =$preson->beiyesi($q,$tested,$a,$b,$c,$answer);
		
	}else{
		echo "答错";
		$answer=0;
		//计算能力值theta
		$th =$preson->beiyesi($q,$tested,$a,$b,$c,$answer);
		echo "潜在特质是".$th;
	}
	$sql1 ="select * from ques_bank where co_id=$co_id";
	$_SESSION['ttheta']=$th;
	$rows2 = mysql_query($sql1);
	var_dump($rows2);
	$_SESSION['testing_num']++;
	$i = 0;
	while ($row = mysql_fetch_assoc($rows2)) {
		$Infor[$i]['info']=$preson->logistic($th,$row['IRTa'],$row['IRTb'],$row['IRTc']);
		$Infor[$i]['title']=$row['ques_id'];
		$i++;
	}
	var_dump($Infor);
	$m_info = max($Infor);
	echo "<pre>";
		print_r($_SESSION['test']);
	echo "</pre>";
	echo $th;
?>