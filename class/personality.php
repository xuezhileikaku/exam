<?php
/*
* 
*/
class Personality{
	private $tmp;
	public $pTheta;
	public $qTheta;
	public $iTheta;
	public $testTheta;
	//项目难度
	
	//初步估计能力时，步长法计算公式
	function Longrun($react,$theta0,$run){
		if($react==1){
			$theta=$theta0+$run;
		}else{
			$theta=$theta0-$run;
		}
		return $theta;
		
	}

	//初步估计能力时，对数法计算公式
	function logn($tr,$tw){
		if($tr=0||$tw=0){
			$tmp=($tr+0.5)/($tw+0.5);	
			$theta=log($tmp,M_E);	
		}else{
			$tmp=$tr/$tw;
			$theta=log($tmp,M_E);
		}
		return $theta;
	}
	//$arrX是考生能力先验分布(能力样本参数)
	function arrayX($tNum){	
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
			for ($i=0; $i <$tNum/2; $i++) { 
			//求出对称点的x坐标轴的值
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
	function beiyesi($q,$tested,$a,$b,$c,$answer){
		$tNum = $q;
		//$arrX是考生能力先验分布(能力样本参数)
		$arrX =$this->arrayX($tNum);
		//$arrA是服从正态的密度函数值;
		$arrA =$this->arrA($arrX);
		//能力为0的被试项目反应矩阵的似然函数
		$arrL;
		//项目区分度
		$ITRa;
		//项目难度
		$ITRb;
		//项目猜测度
		$IRTc;
		//本次测验中已经回答的项目数目
		$exam_Answered= count($tested);
		$t=0;
		$dAbililty=0;
		//D标准常数
		define("D", 1.702);
		for ($j=0; $j < $q ; $j++) {
			$arrL[$j]=1;//	L[j]赋初值
			$tmp1=0;
			for($k=0;$k<$exam_Answered;$k++){
				
				//被试对已施测的第K个项目的反应概率，答对或答错
				$tmp1=$c+(1-$c)/(1+exp(-D*$a*($arrX[$j]-$b)));
				if($answer){
					$arrL[$j]*=$tmp1;//如果答对，计算Pi（0）
				}else{
					$arrL[$j]*=1-$tmp1;//如果答错，计算1-Pi（0）
				}
			}
			$dAbililty+=$arrX[$j]*$arrL[$j]*$arrA[$j];
			$t+=$arrL[$j]*$arrA[$j];
		}
		//验证ptheta的值
		echo "Ptheta";
		var_dump($arrL);
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
	/*
	function beiyesi($q,$test,$a,$b,$c,$answer){
		//$arrX是考生能力先验分布(能力样本参数)
		$arrX;
		//$arrA是服从正态的密度函数值;
		$arrA;
		//能力为0的被试项目反应矩阵的似然函数
		$arrL;
		//项目区分度
		$ITRa;
		//项目难度
		$ITRb;
		//项目猜测度
		$IRTc;
		//本次测验中已经回答的项目数目
		$examineeNumAnsweredIterms=count($test);
		//测验中要回答的第k道题
		$examineeAnsweredIterms[$k]
		//
		$t=0;
		//
		$dAbililty=0;
		
		//D标准常数
		define("D", 1.702)
		for ($j=0; $j < $q ; $j++) { 
			$arrL[$j]=1;//	L[j]赋初值
			$tmp1=0;
			for($k=0;$k<$examineeNumAnsweredIterms;$k++){
				$a=$examineeAnsweredIterms[$k].$ITRa;//第k个项目的区分度
				$b=$examineeAnsweredIterms[$k].$ITRb;//第k个项目的难度
				$c=$examineeAnsweredIterms[$k].$ITRc;//第k个项目的猜测度
				$tmp1=$c+(1-$c)*exp(D*$a*($arrX[$j]-$b))/(1+exp(D*$a*($arrX[$j]-$b)));//被试对已施测的第K个项目的反应概率，答对或答错
				$answer=$examineeAnsweredIterms[$k].$RithtAnswered;//被试回答第k个项目的反应
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

	}*/



	//三参数逻辑斯蒂克模型，$ci表示项目i的猜测度 $ai是项目i的区分度θ表示被试的能力$bi表示项目i的难度参数 
	function logistic($theta,$ai,$bi,$ci){
		$pTheta=$ci+(1-$ci)*(exp($ai*($theta-$bi))/(exp($ai*($theta-$bi))+1));
		return $pTheta;

	}
	//项目信息函数
	function itermMessage($pTheta,$qTheta){		
		$iTheta=($pTheta*$pTheta)/($pTheta*$qTheta);
		return $iTheta;

	}
	//测验信息函数
	function testMessage($iNum,$iThetaI){
		for ($i=0; $i <= $iNum; $i++) { 
			$iThetaI="\$iTheta".$i;
			$iTheta0=0;
			$testTheta.=$iThetaI;
		}
		return $testTheta;
	}
	

}