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
	  $res=$pdo->query("select * from exam_know_bank WHERE know_id={$id}");//编辑课程
	  $res->setFetchMode(PDO::FETCH_ASSOC);
	  $re_arr = $res->fetchAll();
	  //var_dump($re_arr);		
	}elseif ($_GET['ac']=='del') {//删除试题
		$res=$pdo->exec("delete from exam_know_bank where know_id={$id}");//
		jumpUrl("./course_det.php?id=$co",'删除成功');
	}
}
//接收编辑试题传过来的数据
if (!empty($_POST)) {

    $id=$_POST['know_id'];
    $name=htmlspecialchars($_POST['know_name'],ENT_QUOTES);
    $desc=htmlspecialchars($_POST['know_desc'],ENT_QUOTES);
    $co=$_POST['co'];
    $sql="UPDATE exam_know_bank SET know_name = \"{$name}\",know_desc=\"{$desc}\"  WHERE know_id = \"{$id}\"";
    $res=$pdo->exec($sql);
    if($res){

      jumpUrl("./course_det.php?id=$co",'更新成功');
    }else{

      jumpUrl("./know.php?ac=ed&co=$co&id=$id",'更新失败！');
    }
}

?>
<section id="main" class="column" style="height: 1685px;">
  <article class="module width_full">
    <header><h3 class="tabs_involved">编辑知识点</h3>
    </header>
    <form action="know.php" method="post">   
    <div class="tab_container">
      <div id="tab1" class="tab_content" style="display: block;">
			<table class="tablesorter" cellspacing="0"> 
			<thead> 
		        <tr> 
		            <th class="header" >id</th>
		            <th class="header" >知识点</th>
		            <th class="header">知识点描述</th>
		        </tr> 
		      </thead> 
		      <tbody> 
		          <?php	 
		          //var_dump($re_arr);         
		            echo "<tr ><td><input type='text' class='form-control' name='know_id' value=\"{$re_arr[0]['know_id'] }\"/> </td>";//id
		            echo "<td><input type='text' class='form-control' name='know_name' value=\"{$re_arr[0]['know_name'] }\"/> </td>"; //知识点
		            echo "<td><input type='text' class='form-control' name='know_desc' value=\"{$re_arr[0]['know_desc'] }\"/></td>";
		            echo "<input type='hidden' name='co' value= \"{$co}\"/></tr>";
		      ?>
		      </tbody>  
			</table>
			</div><!-- end of #tab1 -->
			<footer>
				<input type='submit' value='保存' />
			</footer>
    </form>
    </div><!-- end of .tab_container -->
    
    </article><!-- end of content manager article -->
</section>
	<div class="container-fluid">
		<h2 align="center">课程列表</h2>
    <div>    
    </div>
		<table class="table table-striped" >
			<tr align="center" class="active">
				<td>
					id
				</td>
				<td>
					课程名
				</td>
				<td>
					课程描述
				</td>
				<td>
					编辑
				</td>
				<td>
					测试
				</td>
			</tr>
		</table>
    <button onclick="javascript:show();" class="btn">添加课程</button>
      <div id="co_add">
        <form class="form-inline" action="course_add.php" method="post"  >
         <div class="form-group">
            <label for="exampleInputName2">课程名</label>
            <input type="text" name="co_name" class="form-control" placeholder="课程名">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail2">课程描述</label>
            <input type="text" name="co_desc" class="form-control" placeholder="本课程介绍">
          </div>
          <button type="submit"  class="btn btn-default">提交</button>
        </form>
      </div>
      

	</div>
 <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
   
    <script src="../public/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../public/js/ie10-viewport-bug-workaround.js"></script>
  

</body>
</html>