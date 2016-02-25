<?php
include("../ini.php");
include("../funs.php");
if (!empty($_GET)) {
  $id=$_GET['id'];
  
  $res=$pdo->query("select * from exam_ques_bank WHERE co_id=".$id);
  $res->setFetchMode(PDO::FETCH_ASSOC);
  $_SESSION['ques']= $res->fetchAll();
  unset($_SESSION['co_id']);
  $_SESSION['co_id']=$id;
  $start=0;
  $_SESSION['time_s']=time();
}
if (!empty($_POST)) {
  $start=$_POST['cur_id']+1;
  if ($_POST['options']==$_SESSION['ques'][$_POST['cur_id']]['answer']) {
    $_SESSION['ques'][$_POST['cur_id']]['ans']='t';
  }else{
    $_SESSION['ques'][$_POST['cur_id']]['ans']='f';
  }
  if ($start>=count($_SESSION['ques'])) {
    jumpUrl('course_res.php','请查看结果');
  }
}
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
	<div class="container-fluid">
		<h2 align="center">开始测试</h2>
		<div class="title">
			<h3><?php echo ($start+1).'、'.$_SESSION['ques'][$start]['ques_title']?>
			</h3>
		</div>
		<div class="ans">
			<form action="course_test.php" method="post" role="form">
			    <div class="btn-group" data-toggle="buttons">
				    <label class="btn btn-default btn-lg">
				      <input type="radio" name="options" value="A" id="1"> 选项A:
				      <?php echo $_SESSION['ques'][$start]['answer_a']?>
				    </label><br/>
				    <label class="btn btn-default btn-lg">
				      <input type="radio" name="options" value="B" id="2"> 选项B:
				      <?php echo $_SESSION['ques'][$start]['answer_b']?>
				    </label><br/>
				    <label class="btn btn-default btn-lg">
				      <input type="radio" name="options" value="C" id="3"> 选项C:
				      <?php echo $_SESSION['ques'][$start]['answer_c']?>
				    </label><br/>
				    <label class="btn btn-default btn-lg">
				      <input type="radio" name="options" value="D" id="3"> 选项D:
				      <?php echo $_SESSION['ques'][$start]['answer_d']?>
				    </label>
				  </div><br/>
          <div class="irt" >
            <input type="hidden" name="IRT_a" value="<?php echo $_SESSION['ques'][$start]['IRT_a'];?>" />
            <input type="hidden" name="IRT_b" value="<?php echo $_SESSION['ques'][$start]['IRT_b'];?>" />
            <input type="hidden" name="IRT_c" value="<?php echo $_SESSION['ques'][$start]['IRT_c'];?>" />
            <input type="hidden" name="cur_id" value="<?php echo $start;?>" />
          
          </div>
          <div class="btn"><input type="submit" class="btn btn-success" value="下一题" /></div>      
    	</form>
		</div>
	</div>
</div>   	
<?php include("./public/foot.php"); ?>
