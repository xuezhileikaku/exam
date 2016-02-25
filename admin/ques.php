<?php
include("../ini.php");
include("../funs.php");
include("./public/head.php");
include("./public/menu.php");
include("./public/side.php");

if (!empty($_GET)) { 
	$co=$_GET['co'];//课程id
	$id=$_GET['id']; //试题id 
	if ($_GET['ac']=='ed') {//编辑试题
	  	$res=$pdo->query("select * from exam_know_bank WHERE co_id={$co}" );
  		$res2=$pdo->query("select * from exam_ques_bank WHERE ques_id={$id}");
  		$res->setFetchMode(PDO::FETCH_ASSOC);
		$res2->setFetchMode(PDO::FETCH_ASSOC);
  		foreach ($res->fetchAll() as $key => $v) {
  		 	$know_arr[$v['know_id']]=$v['know_name'];
  		 } 
  		$re_arr=$res2->fetchAll();
	  	
	}elseif ($_GET['ac']=='del') {//删除试题
		$res=$pdo->exec("delete from exam_ques_bank where ques_id={$id}");//
		jumpUrl("./course_deta.php?id=$co",'删除成功');
	}
}
//接收编辑试题传过来的数据
if (!empty($_POST)) {
	 $id=$_POST['ques_id'];
     $co=$_POST['co'];
     
    $title=htmlspecialchars($_POST['ques_title'],ENT_QUOTES);
    $an_a=htmlspecialchars($_POST['answer_a'],ENT_QUOTES);
    $an_b=htmlspecialchars($_POST['answer_b'],ENT_QUOTES);
    $an_c=htmlspecialchars($_POST['answer_c'],ENT_QUOTES);
    $an_d=htmlspecialchars($_POST['answer_d'],ENT_QUOTES);
    $ans=htmlspecialchars($_POST['answer'],ENT_QUOTES);
    $ana=htmlspecialchars($_POST['analysis'],ENT_QUOTES);
    $IRT_a=htmlspecialchars($_POST['IRT_a'],ENT_QUOTES);
    $IRT_b=htmlspecialchars($_POST['IRT_b'],ENT_QUOTES);
    $IRT_c=htmlspecialchars($_POST['IRT_c'],ENT_QUOTES);
	$know_id=str_replace("，", ",", htmlspecialchars($_POST['know_id'],ENT_QUOTES));

    $sql="UPDATE exam_ques_bank SET ques_title = \"{$title}\", answer_a=\"{$an_a}\", answer_b=\"{$an_b}\",answer_c=\"{$an_c}\",answer_d=\"{$an_d}\",answer=\"{$ans}\",analysis=\"{$ana}\",IRT_a=\"{$IRT_a}\",IRT_b=\"{$IRT_b}\",IRT_c=\"{$IRT_c}\",know_id=\"{$know_id}\" WHERE ques_id = \"{$id}\"";
    $res=$pdo->exec($sql);    
    if($res){

      jumpUrl("./course_deta.php?id=".$co,"更新成功");
    }else{
    	$url="ques.php?ac=ed&co=".$co."&id=".$id;
    	jumpUrl($url,"更新失败！"); 
    }
}

?>

<section id="main" class="column" style="height: 1685px;">
  <article class="module width_full">
    <header><h3 class="tabs_involved">编辑试题</h3>
    </header>
    <form action="ques.php" method="post">   
    <div class="tab_container">
      <div id="tab1" class="tab_content" style="display: block;padding:5px;font-size:medium;">
		<form action="ques.php" method="post">
			<div class="form-group" >
				<label>
					题目:
				</label>
				<textarea class='form-control' rows='2' cols='60' name='ques_title' ><?php echo $re_arr[0]['ques_title'];?></textarea>
			</div>
			<div class="form-group">
				<label>
					选项A:
				</label>
				<input type='text' class='form-control' name='answer_a' value="<?php echo $re_arr[0]['answer_a'];?>"/>
			</div>
			<div class="form-group">
				<label>
					选项B:
				</label>
				<input type='text' class='form-control' name='answer_b' value="<?php echo $re_arr[0]['answer_b'];?>"/>
			</div>
			<div class="form-group">
				<label>
					选项C:
				</label>
				<input type='text' class='form-control' name='answer_c' value="<?php echo $re_arr[0]['answer_c'];?>"/>
			</div>
			<div class="form-group">
				<label>
					选项D:
				</label>
				<input type='text' class='form-control' name='answer_d' value="<?php echo $re_arr[0]['answer_d'];?>"/>
			</div>
			<div class="form-group">
				<label>
					答案:
				</label>
				<input type='text' class='form-control' name='answer' value="<?php echo $re_arr[0]['answer'];?>"/>
			</div>
			<div class="form-group">
				<label>
					解析:
				</label>
				<textarea class='form-control' rows='2' cols='60' name='analysis'><?php echo $re_arr[0]['analysis']?></textarea>
			</div>
			<div class="form-group">
				<label>
					属性:
				</label>
				区分度<input type='text' style="width:50px;" class='form-control' name='IRT_a' value="<?php echo $re_arr[0]['IRT_a'];?>"/>
				&nbsp;&nbsp;难度<input type='text' style="width:50px;" class='form-control' name='IRT_b' value="<?php echo $re_arr[0]['IRT_b'];?>"/>
				&nbsp;&nbsp;猜测度<input type='text' style="width:50px;" class='form-control' name='IRT_c' value="<?php echo $re_arr[0]['IRT_c'];?>"/>
			</div>
			<div class="form-group">
				<label>
					知识点:
				</label>
				<input type='text' style="width:160px;" class='form-control' name='know_id' value="<?php echo $re_arr[0]['know_id'];?>"/>
			</div>
			<div> 知识点列表：
			<?php 
			foreach ($know_arr as $key => $v) {
				echo $key.":".$v."|&nbsp;&nbsp;";
			}
			?></div>
			<footer>
				<input type="hidden" name="co" value="<?php echo $co?>"/>
				<input type="hidden" name="ques_id" value="<?php echo $id?>"/>
				<input type='submit' value='保存' />
			</footer>
    </form>
    </div><!-- end of .tab_container -->
    </article><!-- end of content manager article -->
</section>
 <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
   
    <script src="../public/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../public/js/ie10-viewport-bug-workaround.js"></script>
  

</body>
</html>