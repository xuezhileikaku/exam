<?php
include("../ini.php");
include("../funs.php");
include("./public/head.php");
include("./public/menu.php");
include("./public/side.php");

if (!empty($_GET)) {
   
	if ($_GET['ac']=='ed') {
		jumpUrl("course_edit.php?id=".$_GET['id'],"跳转中。。。");//编辑课程		
	}elseif ($_GET['ac']=='del') {
		$sql="delete from exam_course where co_id={$_GET['id']}";
		$res=$pdo->exec($sql);//
		jumpUrl("course.php",'删除成功');
	}
}





?>
<script type="text/javascript">

    $(document).ready(  function(){
      $("#co_add").hide();
    });
    function show(){
      $("#tab1").show();
      $("#co_add").show();
    }
</script>
<section id="main" class="column" style="height: 1685px;">
  <article class="module width_full">
    <header>
        <h3 class="tabs_involved">课程列表</h3>
        <button style="float:right;" onclick="javascript:show();" class="btn">添加课程</button>
    </header>
    <div class="tab_container">
      <div id="tab1" class="tab_content" style="display: block;">
        <table class="tablesorter" cellspacing="0"> 
          <thead> 
            <tr> 
                <th class="header" style="width:10%">id</th> 
                <th class="header" style="width:10%">课程</th> 
                
                <th class="header" style="width:20%">分类</th>
                <th class="header" style="width:20%">结构</th> 
                <th class="header" style="width:10%">属性</th>
                <th class="header" style="width:10%">策略</th> 
                <th class="header" style="width:10%">操作</th> 
            </tr> 
          </thead> 
          <tbody> 
          <?php
              foreach ($pdo->query("select * from exam_course") as $row) {
                echo '<tr><td>';
                echo $row['co_id'];//课程id
                echo "</td><td>";
                echo $row['co_name']; //课程名
                echo "</td><td>";
                echo $row['co_cat']; //课程分类
                echo "</td><td><a href='course_stru.php?id=".$row['co_id']."'>详细</a></td>
                <td><a href=\"course_deta.php?id={$row['co_id']}\">设置属性</a></td>
                <td><a href=\"course_stra.php?id={$row['co_id']}\">设置策略</a></td>
                <td><a href=\"course.php?ac=ed&id={$row['co_id']}\"><img src=\"./public/images/icn_edit.png\"></a>&nbsp;|&nbsp;<a href=\"course.php?ac=del&id={$row['co_id']}\"><img src=\"./public/images/icn_trash.png\"></a></td></tr>";
              }
          ?>
          </tbody> 
        </table>
      </div><!-- end of #tab1 -->
    </div><!-- end of .tab_container -->
    <footer>  
        <div id="co_add" style="padding-left:40px;padding-top:5px;">
          <form class="form-inline" action="course_add.php" method="post"  >
            <input type="text" name="co_name" class="form-control" placeholder="课程名">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" name="co_desc" class="form-control" placeholder="本课程介绍">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" name="co_cat" class="form-control" placeholder="课程分类">&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit"  class="btn btn-default">提交</button>
          </form>
        </div> 
    </footer>    
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