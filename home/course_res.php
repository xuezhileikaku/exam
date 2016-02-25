<?php
include("../ini.php");
include("../funs.php");

$_SESSION['time_e']=time();
$result='';
foreach($_SESSION['ques'] as $v){
  $result.=$v['ques_id'].":".$v['ans'].",";
}
$sql="INSERT INTO exam_test(co_id,u_id,time_s,time_e,result) VALUES(\"{$_SESSION['co_id']}\",\"{$_SESSION['user']}\",\"{$_SESSION['time_s']}\",\"{$_SESSION['time_e']}\",\"{$result}\")";

$re=$pdo->exec($sql);
include("./public/head.php");
?>
<body>
   <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">IRT test</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li  class="active"><a href="./index.php">Home</a></li>
             <li ><a href="./course.php">Course</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          
           <div style="padding-top:10px;float:right;"><button  class="btn btn-info"><a href=""><?php echo $_SESSION['user']; ?></a></button></div> 
        </div><!--/.nav-collapse -->
      </div>
    </nav>

	<div class="container">
  		<h2 align="center">课程<?php echo $_SESSION['co_id'];?>--||--测试结果</h2>
  		<div class="co_result">
        <table class="table table-striped">
          <tr class="info">
            <td style="width:5%;">
              序号
            </td>
            <td style="width:20%;">
              题目
            </td>
            <td style="width:25%;">选项</td>
            <td style="width:20%;">
              属性
            </td>
            <td style="width:20%;">
              测试者答案
            </td>
            <td style="width:20%;">
              得分
            </td>
            
          </tr>
          <?php 
            foreach ($_SESSION['ques'] as  $i=>$va) {
            echo "<tr ><td>";
            echo $i+1;
            echo "</td><td>";
            echo $va['ques_title'];
            echo "</td><td>";
            echo "A:".$va['answer_a']."<br/>B:".$va['answer_b']."<br/>C:".$va['answer_c']."<br/>D:".$va['answer_d'];
            echo "</td><td>";
            echo "区分度:".$va['IRT_a']."<br/>难度:".$va['IRT_b']."<br/>猜测度:".$va['IRT_c'];
            echo "</td><td>";
             if ($va['ans']=='t') {
              echo "正确";
            }else{
              echo "错误";
            }
            echo "</td><td>分数";

            echo "</td></tr>";

          }?>
        </table>
      </div>  
	</div>
<?php 
            /*json数据
            $json=json_encode($_SESSION['ques']);
            var_dump($json);
            
            $arr=json_decode($json);
            var_dump($arr);*/
include("./public/foot.php");?>


