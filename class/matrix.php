<?php
class Matrix{
    public $rowNum;//矩阵的行
    public $colNum;//矩阵的列
    function _matrix_well_formed($matrix) {
        // 如果不是一个数组返回false
        if (!(is_array($matrix))) {
            return false;
        } else {
            // 获取数组的行
            $rows = count($matrix);
            //  现在循环行
            for ($r = 0; $r < $rows; $r++) {
                /*确保这一行也是一个数组，检查是否设置并确保这是一个基于0的数字索引数组。*/ 
                if (!(isset($matrix[$r]) && is_array($matrix[$r]))) {
                    return false;
                } else {
                    // 统计第一行的列数:
                    if ($r == 0) {
                             // 确保每行的列都是一样，否则退出
                        $cols = count($matrix[$r]);
                    } elseif (count($matrix[$r]) != $cols) {
                            return false;
                    }
                    //现在在本行中循环遍历所有的列
                    for ($c = 0; $c < $cols; $c++) {
                    //  确保每列不为空，并且是一个数字
                        if (!(isset($matrix[$r][$c]) && is_numeric($matrix[$r][$c]))) {
                                return false;
                        }
                    }
                }
            }
        }
        // 现在可以确认这是一个矩阵
        return true;                    
    }
    //获取矩阵的行
    function _matrix_rows($matrix) {
        return count($matrix);
    }
    //获取矩阵的列
    function _matrix_columns($matrix) {
        return count($matrix[0]);
    }
    //生成i阶的单位矩阵
    function arrI($m){
        $arrI=array();
        for ($i=0; $i < $m; $i++) { 
            for ($j=0; $j < $m; $j++) { 
                if ($i==$j) {
                    $arrI[$i][$j]=1;
                }else{
                    $arrI[$i][$j]=0;
                }
            }
        }
        return $arrI;
    }
    //按照列输出矩阵形成新的数组,即矩阵的转置
    function colArr($arr){
        $colArr=array();//新列的数组
        for ($k=0; $k < $this->_matrix_columns($arr); $k++) { 
            for ($i=0; $i < $this->_matrix_rows($arr); $i++) { 
                 $colArr[$k][]=$arr[$i][$k];     
            }
        }
        //var_dump($colArr);
        return $colArr;
    }
    //矩阵的布尔转换
    function bool_transfer($matrix){
        $valid=false;
        if ($this->_matrix_well_formed($matrix)) {
            $valid = true;

        }
         
        // 如果不是一个数组返回false
        if (is_array($matrix)) {
            $arr=array();
            foreach ($matrix as $k => $v) {
                foreach ($v as $k0 => $v0) {
                    $arr[$k][$k0]=(int)(bool)$v0;
                }
            }
            return $arr;
         }else{
            return false;
         }

    }
    //矩阵的布尔加法,$arr1,$arr2是表示矩阵的二维数组
    function matrix_boolplus($a, $b) {
        // 验证矩阵都是完整的
        $valid = false;
        if ($this->_matrix_well_formed($a) && $this->_matrix_well_formed($b)) {
            // 确保他们有相同数量的列和行
            $rows =$this->_matrix_rows($a);
            $columns =$this->_matrix_columns($a); 
            if (($rows == $this->_matrix_rows($b)) && ($columns == $this->_matrix_columns($b))) {
                //这里对数学元素进行一个有效的设置
                $valid = true;
            }
        }
        // 如果无效，返回FALSE
        if (!($valid)) { return false; }
        // 两个矩阵中的元素进行运算
        for ($r = 0; $r < $rows; $r++) {
            for ($c = 0; $c < $columns; $c++) {
                $a[$r][$c]=(int)(bool)($a[$r][$c]+$b[$r][$c]);
            }
        }
    // Return the finished matrix:
    return $a;    
    }
    //对删除矩阵中相同的行,并重新排序
    function matrix_unique($arr){
         $temp=array();
         //$this->display($arr);
        foreach ($arr as $v){
            $v = implode(",", $v);  //降维,也可以用implode,将一维数组转换为用逗号连接的字符串
           
            $temp[] = $v;
        }
        $temp = array_unique($temp);    //去掉重复的字符串,也就是重复的一维数组
        foreach ($temp as $k =>$v){
            $temp[$k] = explode(",",$v);   //再将拆开的数组重新组装
        }
        return $temp;
    }
    //向量的布尔的加法,向量加法的值
    function vectorPlus($arr1,$arr2){
        $n=count($arr1);
        $arrN=array();
        for ($i=0; $i <$n ; $i++) { 
            $arrN[$i]=(int)(bool)($arr1[$i]+$arr2[$i]); 
        }
        return $arrN;
    }
    //一个矩阵的完整的运算（适用于加法、减法和乘法）
    function matrix_operation($a, $b, $operation) {
        $new=array();
        // 验证矩阵的运算
        if ($operation=="+"||$operation=="-") {
            //echo "进行加减运算";
            $new=$this->matrix_element_operation($a,$b,$operation);
        }elseif ($operation=="*") {
            //echo "进行乘法运算";
            $new=$this->matrix_multiply_operation($a,$b);
        }
        // 返回新数组:
        return $new;
    }
    //矩阵的加法和减法
    function matrix_element_operation($a, $b, $operation) {
        // 验证矩阵都是完整的
        $valid = false;
        if ($this->_matrix_well_formed($a) && $this->_matrix_well_formed($b)) {
            // 确保他们有相同数量的列和行
             $rows =$this->_matrix_rows($a);
            $columns =$this->_matrix_columns($a); 
            if (($rows == $this->_matrix_rows($b)) && ($columns == $this->_matrix_columns($b))) {
                //这里对数学元素进行一个有效的设置
                $valid = true;
            }
        }
        // 如果无效，返回FALSE
        if (!($valid)) { return false; }
        // 两个矩阵中的元素进行运算
        for ($r = 0; $r < $rows; $r++) {
            for ($c = 0; $c < $columns; $c++) {
                eval('$a[$r][$c] '.$operation.'= $b[$r][$c];');
            }
        }
    // Return the finished matrix:
    return $a;    
    }
    //矩阵乘法
    function matrix_multiply_operation($matrixleft, $matrixright) {
        // 校验矩阵合法性
        $valid = false;
        if ($this->_matrix_well_formed($matrixleft) && $this->_matrix_well_formed($matrixright)) {
            // 确保A矩阵的行和B矩阵的列相等
            $rowsleft = $this->_matrix_rows($matrixleft);
            $columnsleft =$this->_matrix_columns($matrixleft);
            $rowsright = $this->_matrix_rows($matrixright);
            $columnsright = $this->_matrix_columns($matrixright);
            if ($columnsleft == $rowsright) {
                //  左列等于右行则乘法有意义
                $valid = true;

            }
        }
        
        // 如果无效，返回false
        if (!($valid)) { return false; }
        
        // 创建一个新的数组，存放结果
        $new = array_fill(0, $rowsleft, array_fill(0, $columnsright, 0));
        
        // 循环左数组的行，从第一行开始计算
        for ($r = 0; $r < $rowsleft; $r++) {
            // For each column in b ...循环右数组的列
            for ($c = 0; $c < $columnsright; $c++) {
                // 每行每列分别进行运算，并将结果存入新的数组返回
                for ($ac = 0; $ac < $columnsleft; $ac++) {
                    // 评价计算结果
                    $new[$r][$c] += $matrixleft[$r][$ac]*$matrixright[$ac][$c];
                }
            }
        } 
        // 返回矩阵
        return $new;
    }
    //矩阵的n次幂
    function matrix_power_operation($matrix,$number=2){
        if($number<2){
        //幂次必须大于或等于2，不满足使用默认乘方
            $number=2;
            }
        if ($this->_matrix_well_formed($matrix)){
        //验证矩阵的合法性，只有n阶矩阵才能求幂
            $rows = $this->_matrix_rows($matrix);
            $columns = $this->_matrix_columns($matrix);
            if($rows==$columns){
            //行和列必须相等才能进行运算
                $new = $matrix;
                for ($i=0; $i <$number-1 ; $i++) { 
                    $new = $this->matrix_multiply_operation($new, $matrix);
                }
                return $new;
            }else{
                return false;   
            }

        }else{
            return false;  
        }
    }
    //比较两个矩阵
    function matrix_compare($matrix1,$matrix2){
        if ($this->_matrix_well_formed($matrix1)&&$this->_matrix_well_formed($matrix2)) {
            $n=count($matrix1);
            $newarr=array();
            for ($i=0; $i <$n; $i++) { 
                $newarr[$i]=array_diff($matrix1[$i], $matrix2[$i]);
            }
            return $newarr;
        }else{
            echo false;
        }
        
    }
    //由A矩阵求出R矩阵，R反映属性间认知属性的直接关系、间接关系和自身关系的矩阵，即可达矩阵
        //$max为最大执行多少次循环
    function arrR($arr,$max=10){
        //display($arr,"进来的A矩阵");
        $arr_col=array();
        $arr_i=$this->arrI(count($arr));
        //$this->display($arr_i,"arr_i");
        $arr_col[1]=$this->matrix_operation($arr, $arr_i, "+");
        //$this->display($arr_col[1],"arr+arr_i");
        
        for ($n=2; $n <$max ; $n++) { 
            
            $arr_col[$n]=$this->bool_transfer($this->matrix_power_operation($arr_col[1], $n));
             /*echo $n-1;
             $this->display($arr_col[$n-1],"n-1");
             echo "<br/>";
             echo "$n";
            $this->display($arr_col[$n],"n");
           */
            if ($n>3) {
                $result=$this->matrix_compare($arr_col[$n-1], $arr_col[$n]);
               //var_dump($result);
                if (empty($result[0])) {
                        echo "两个矩阵相等<br/>";
                        echo "执行了".$n."次循环<br/>"; 
                       
                        //$this->display($arr_col[$n],"R矩阵");
                        return $arr_col[$n];
                        break; 
                }
            }     
        }
    }
    //以一定格式输出矩阵
     function display($matrix,$name=""){
        echo "<table>";
        echo "<th>".$name."</th>";
        if (!empty($matrix)) {
            if (is_array($matrix[0])) { 
                foreach ($matrix as $key => $value) {
                    echo "<tr>";
                    echo "<td>";
                    echo ($key+1)."行";
                    echo "</td>";
                    foreach ($value as $key1 => $value1) {
                        echo "<td>";
                        echo $value1."|";
                        echo "</td>";
                    }
                    echo "</tr>";
                }
                echo "</table>";
            }else{              
                echo "<tr>";
                foreach ($matrix as $key => $value) { 
                    echo "<td>";
                    echo $value."|";
                    echo "</td>";  
                }
                echo "</tr>";
                echo "</table>";
            }  
         }      
    }
     //由R矩阵求取典型考核模式，理想掌握模式是加上一维全为0的数组(原来的行变成了列)
    function ideKnow($arr,$n=5){
        //display($arr,"进入final的R矩阵"); 
        //矩阵按列输出
        $arr1=$this->colArr($arr);
        //display($arr1,"按照列输出的R矩阵");
        if (is_array($arr1)) {
            $k=$this->_matrix_rows($arr1);
            $m=$k;
            for ($i=0; $i<$k-1; $i++) { 
                for ($q=$i+1; $q <$k ; $q++) {
                    $arr1[$m]=$this->vectorPlus($arr1[$i],$arr1[$q]);
                    $arr1=$this->matrix_unique($arr1);
                    $k=$this->_matrix_rows($arr1);
                    if ($m==$this->_matrix_rows($arr1)) {
                        $m=$m+0;
                    }else{
                        $m++;
                    }
                }
            }
        }
        $arr1=$this->colArr($arr1);
        return $arr1;
    }
/*
*第一次写的，作为思路的参考
    function final_Matrix($arr,$n=3){
        $this->display($arr,"进入final的R矩阵"); 
        $temp=array();
        $temp1=array();
        for ($i=0; $i <$n ; $i++) {
            $arr0=$this->IdeMatrix($arr);
            $arr1=$this->IdeMatrix($arr0);
            //$this->display($arr0,"矩阵的第一次循环");
            //$this->display($arr1,"矩阵的第二次循环");
            $num0=count($arr0);
            $num1=count($arr1);
            if ($num0=$num1) {
                //$this->display($arr1);
                return $arr1;
                break;
            }else{
                $arr1=$this->IdeMatrix($this->colArr($arr1));
            }
        }
    }
    //扩张算法计算第二部分
    function IdeMatrix($arr){
        //矩阵按列输出
        $arr1=$this->colArr($arr);
        
        if (is_array($arr1)) {
            $k=count($arr1);
            $m=$k;
            for ($i=0; $i<$k-1; $i++) { 
                for ($j=$i; $j <$k ; $j++) { 
                    for ($q=$j+1; $q <$k ; $q++) {
                        $arr1[$m]=$this->vectorPlus($arr1[$j],$arr1[$q]);
                        $arr1=$this->matrix_unique($arr1);
                        $m++;
                    }
                }
            }
        }
        $arr1=$this->colArr($arr1);
        return $arr1;
    }*/
}


