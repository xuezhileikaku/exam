<?php
/**
* 
*/


	function arrayX($tNum){	
	//$arrX是考生能力先验分布(能力样本参数)
		$arrX=array();
		//每个能力值的间距
		$nm=6/($tNum-1);
		//保留四位有效数字
		$n=number_format($nm,4);
		$m = 3;//theta最大值
		if ($tNum%2) {//奇数
			for ($i=0; $i <($tNum-1)/2; $i++) { //求出对称点的x坐标轴的值
				$w=3-$n*$i;
				// $arrX[$i+1]=-$w;
				$arrX[$i] = -$w;
				$arrX[$tNum-$i-1]=$w;
			}
			$y=($tNum+1)/2;
			$arrX[$y]=0;	
		}else{//偶数
			for ($i=0; $i <$tNum/2; $i++) { //求出对称点的x坐标轴的值
				$w=3-$n*$i;
				// $arrX[$i+1]=-$w;
				$arrX[$i] = -$w;
				// $arrX[$tNum-$i]=$w;	
				$arrX[$tNum-$i-1]=$w;
			}
		}
		return $arrX;
	}
	function arrA($arrX,$u=0,$thgma=1){
		$arrA=array();
		foreach ($arrX as $k => $v) {
			$arrA[$k]=number_format(exp(-$v*$v/2)/(sqrt(2*M_PI)),4);
		}
		return $arrA;
	}
	//能力精估时，贝叶斯计算公式
	function beiyesi($tnum){
		//$arrX是考生能力先验分布(能力样本参数)
		$arrX = arrayX($tNum);
		//$arrA是服从正态的密度函数值;
		$arrA = arrA($arrX);
		//能力为0的被试项目反应矩阵的似然函数
		$arrL;
		//项目区分度
		$ITRa;
		//项目难度
		$ITRb;
		//项目猜测度
		$IRTc;
		//本次测验中已经回答的项目数目
		$examineeNumAnsweredIterms = count($_SESSION['test']);
		$t=0;
		$dAbililty=0;
		//D标准常数
		define("D", 1.702);
		for ($j=0; $j < $tnum ; $j++) {
			$arrL[$j]=1;//	L[j]赋初值
			$tmp1=0;
			for($k=0;$k<$examineeNumAnsweredIterms;$k++){
				$a = $_SESSION['test'][$k]['irta'];
				$b = $_SESSION['test'][$k]['irtb'];
				@$c = $_SESSION['test'][$k]['irtc'];
				$tmp1=$c+(1-$c)/(1+exp(-D*$a*($arrX[$j]-$b)));//被试对已施测的第K个项目的反应概率，答对或答错
				$answer = $_SESSION['test'][$k]['right'];
				if($answer){
					$arrL[$j]*=$tmp1;//如果答对，计算Pi（0）
				}else{
					$arrL[$j]*=1-$tmp1;//如果答错，计算1-Pi（0）
				}
			}
			$dAbililty+=$arrX[$j]*$arrL[$j]*$arrA[$j];
			$t+=$arrL[$j]*$arrA[$j];
		}
		$dAbililty/=$t;
		//能力值调整在范围（-3.0-3.0）之间
		if ($dAbililty<-3.0) {
			return $dAbililty=-3.0;
		}
		if ($dAbililty>3.0) {
			return $dAbililty=3.0;
		}
		$o_exapineeAbility=$dAbililty;
		return ($dAbililty);
	}
	


	
	