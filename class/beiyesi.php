<?php
/*
*
* 
*/	
	//n道试题的答对概率--数组$arr_ptheta;
	//thema基于IRT的警戒指标$thema;
	//n道试题的作答反应向量--数组$x;
	//f(x)$fx;
	//T(theta)$ttheta
	
function thegma($irta,$irtb,$irtc,$theta,$x){
		$d=1.702;
		//测验试题总量,判断试题数目是否相同
		$n=count($irta);
		if($n==count($irtb)){
			if($n==count($irtc)){
				if($n==count($x)){
					echo "IRTc、IRTb和x的数目和IRTa的一致";
				}else{
					echo "x的数目和IRTa的不一致";
				}
			}else{
				echo "IRTc的数目和IRTa的不一致";
			}
		}else{
			echo "IRTb的数目和IRTa的不一致";
		}
		$tmp=array();
		//计算ptheta
		for ($i=0; $i < $n; $i++) { 
			$tmp[$i]=$irtc[$i]+(1-$irtc[$i])*exp($d*$irta[$i]*($theta-$irtb[$i]))/(1+exp($d*$irta[$i]*($theta[$i]-$irtb[$i])));	
		}
		$arr_ptheta=$tmp;		
		$me=0;
		$tmp0=array();
		$tmp1=array();
		foreach ($arr_ptheta as $key => $value) {
			$me+=$value;
			$tmp0+=($arr_ptheta[$key]-$ttheta)*$arr_ptheta[$key];
			$tmp1+=($arr_ptheta[$key]-$ttheta)*$x[$key];
			$va+=$arr_ptheta[$key]*(1-$arr_ptheta[$key])($arr_ptheta[$key]-$ttheta))*($arr_ptheta[$key]-$ttheta));
		}
		//T(theta)的值
		$ttheta=$me/$n;
		//f(x)的值
		$fx=$tmp0-$tmp1;
		//varf(x)
		$varfx=$va;
		//thegma的值;
		$thema=$fx/sqrt($variance($arr_ptheta));
		return $thema;
	}