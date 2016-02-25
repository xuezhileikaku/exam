<?php
include("../ini.php");
include("../funs.php");

if (!empty($_GET)) {
		$id=$_GET['id'];

		/*待编辑
		if (exit($_GET['cid'])) {
			echo "存在";
		}else{
			echo "不存在";
		}*/
  		$res=$pdo->query("select * from exam_know_bank WHERE co_id={$id}");
  		$res2=$pdo->query("select * from exam_ques_bank WHERE co_id={$id}");
  		$res->setFetchMode(PDO::FETCH_ASSOC);
		$res2->setFetchMode(PDO::FETCH_ASSOC);
  		$know_arr = $res->fetchAll();
  		$ques_arr=$res2->fetchAll();

}else{
	jumpUrl('course.php','重新选择课程');
	break;
}
include("./public/head.php");
include("./public/menu.php");
include("./public/side.php");

?>
<script type="text/javascript">

    $(document).ready(  function(){
      $("#ques_add").hide();
      $("#know_add").hide();
    });
    function showq(){
      
      $("#ques_add").show();
    }
    function showk(){
    	$("#know_add").show();
    }
</script>   
<section id="main" class="column" style="height: 1685px;">
	<article class="module width_full">
		<header><h3 class="tabs_involved">试题</h3>
		<ul class="tabs">
   			<li class="active"><a href="#tab2">知识点</a>
   			</li>
    		<li >
    			<a href="#tab1">试题</a>
    		</li>
		</ul>
		</header>
		<div class="tab_container">
			
			<div id="tab2" class="tab_content" style="display: none;">
			<table class="tablesorter" cellspacing="0"> 
			    <thead> 
			        <tr> 
			            <th class="header">id</th> 
			            <th class="header">知识点</th>
			            <th class="header">描述</th>
			            <th class="header">操作</th> 
			        </tr> 
			    </thead> 
		     	<tbody> 
		          <?php
		          foreach ($know_arr as $key => $v) {
		            echo '<tr  ><td>';
		            echo ($key+1);//知识点id
		            echo "</td><td>";
		            echo $v['know_name']; //知识点名
		            echo "</td><td>";
		            echo  $v['know_desc']; //知识点描述
		            echo "</td><td><a href=\"know.php?ac=ed&co={$id}&id={$v['know_id']}\"><img src=
		            \"./public/images/icn_edit.png\"></a>&nbsp;|&nbsp;<a href=\"know.php?ac=del&co={$id}&id={$v['know_id']}\"><img src=\"./public/images/icn_trash.png\"></a></td></tr>";
			        }
			      	?>
		      	</tbody>
		      	
			    <form class="form-inline" action="know_add.php" method="post"  >
		      	<tr id="know_add" style="display:none">
		      		<td><input type="hidden" name="co" value="<?php echo $id?>" /></td>
		      		<td>
		      			<input type="text" name="know_name" class="form-control" placeholder="知识点">
		      		</td>
		      		<td>
		      			<input type="text" name="know_desc" class="form-control" placeholder="描述">
		      		</td>
		      		<td>
		      			<button type="submit"  class="btn btn-default">提交</button>
		      		</td>
		      	</tr>
		      	</form>
		    </table>
			<footer>
			   <button style="float:right;" onclick="javascript:showk();" class="btn">添加知识点</button>
			</footer>
			</div>	<!-- end of #tab2 -->
			<div id="tab1" class="tab_content" style="display: block;">
			<table class="tablesorter" cellspacing="0"> 
			<thead> 
		        <tr> 
		            <th class="header" style="width:4%;">id</th> 
		            <th class="header" style="width:20%;">试题</th>
		            <th class="header" style="width:18%;">选项</th>
		            <th class="header" style="width:8%;">答案</th>
		            <th class="header" style="width:20%;">解析</th>
		            <th class="header" style="width:10%;">属性</th>
		            <th class="header" style="width:10%;">考察知识点</th>
		            <th class="header" style="width:10%;">操作</th> 
		        </tr> 
		      </thead> 
		      <tbody> 
		          <?php
		          foreach ($ques_arr as $key => $v) {

		            echo '<tr ><td>';
		            echo ($key+1);//试题id
		            echo "</td><td>";
		            echo $v['ques_title']; //题目
		            echo "</td><td>";
		            echo "A:".$v['answer_a']."<br/>"; //选项
		            echo "B:".$v['answer_b']."<br/>"; //选项
		            echo "C:".$v['answer_c']."<br/>"; //选项
		            echo "D:".$v['answer_d']; //选项
		            echo "</td><td>";
		             echo $v['answer']; //答案
		            echo "</td><td>";
		            echo $v['analysis']; //解析
		             echo "</td><td>";
		            echo "a：".$v['IRT_a']."<br/>"; //题目区分度
		            
		            echo "b：".$v['IRT_b']."<br/>"; //题目难度
		          
		            echo "c：".$v['IRT_c']; //题目猜测度
		            echo "</td><td>";
		      		foreach (explode(',', $v['know_id']) as $key => $va) {
		      			echo $know_arr[$va]."<br/>";
		      		}
		            echo "</td><td><a href=\"ques.php?ac=ed&co={$id}&id={$v['ques_id']}\"><img src=
		            \"./public/images/icn_edit.png\"></a>&nbsp;|&nbsp;<a href=\"ques.php?ac=del&co={$id}&id={$v['ques_id']}\"><img src=\"./public/images/icn_trash.png\"></a></td></tr>";
		        }
		      ?>
		      <form class="form-inline" action="ques_add.php" method="post"  >

				<tr id="ques_add" style="display:none">
					<th ><input type="hidden" name="co" value="<?php echo $id?>" /></th>
					<th ><input  type="text" name="ques_title"  placeholder="题目"></th>
					<th ><input type="text"  name="answer_a"  placeholder="选项A"><br/><input type="text" name="answer_b"  placeholder="选项B"><br/><input type="text" name="answer_c"  placeholder="选项C"><br/><input type="text" name="answer_d"  placeholder="选项D"></th>
					<th ><input type="text" style="width:100px;" name="answer"  placeholder="答案"></th>
					<th ><input type="text" name="analysis"  placeholder="解析"></th>
					<th ><input  type="text" name="IRT_a"  placeholder="区分度a"><br/><input type="text" name="IRT_b"  placeholder="难度b"><br/><input type="text" name="IRT_c"  placeholder="猜测度c"></th>
					<th ><button type="submit"  class="btn btn-default">提交</button></th>
				</tr>
				</form>
		      </tbody>  
			</table>
			<footer>
			   <button style="float:right;" onclick="javascript:showq();" class="btn">添加试题</button>
			</footer>
			</div><!-- end of #tab1 -->
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