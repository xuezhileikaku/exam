<?php
include("../ini.php");
include("../funs.php");
include("./public/head.php");
include("./public/menu.php");
include("./public/side.php");
if (!empty($_GET)) {
	if ($_GET['ac']=='ed') {
		jumpUrl("user_edit.php?id=".$_GET['id'],"跳转中。。。");//编辑课程		
	}elseif ($_GET['ac']=='del') {
		$sql="delete from exam_user where u_id={$_GET['id']}";
		$res=$pdo->exec($sql);//
		jumpUrl("user.php",'删除成功');
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
        <h3 class="tabs_involved">用户列表</h3>
        <button style="float:right;" onclick="javascript:show();" class="btn">添加用户</button>
    </header>
    <div class="tab_container">
      <div id="tab1" class="tab_content" style="display: block;">
        <table class="tablesorter" cellspacing="0"> 
          <thead> 
            <tr> 
                <th class="header" >id</th> 
                <th class="header" >用户名</th> 
                <th class="header">班级</th>
                <th class="header" >邮箱</th> 
                <th class="header" >电话</th> 
                <th class="header" >操作</th> 
            </tr> 
          </thead> 
          <tbody> 
          <?php
              foreach ($pdo->query("select * from exam_user") as $k=>$row) {
                echo '<tr><td>';
                echo $k+1;
                echo "</td><td>";
                echo $row['u_name'];//用户名
                echo "</td><td>";
                echo $row['u_class']; //用户班级
                echo "</td><td>";
                echo $row['u_email']; //用户邮箱
                echo "</td><td>";
                echo $row['u_tel']; //用户电话
                echo "</td><td><a href=\"user.php?ac=ed&id={$row['u_id']}\"><img src=\"./public/images/icn_edit.png\"></a>&nbsp;|&nbsp;<a href=\"user.php?ac=del&id={$row['u_id']}\"><img src=\"./public/images/icn_trash.png\"></a></td></tr>";
              }
          ?>
          </tbody>
          <tr id="co_add" style="padding-left:40px;padding-top:5px;">
          <form class="form-inline" action="user_add.php" method="post"  >
          	<td><input type="text" name="u_name" class="form-control" placeholder="用户名"></td>
          	<td><input type="password" name="u_pwd" class="form-control" placeholder="密码"></td>
          	<td><input type="text" name="u_class" style="width:60px;" class="form-control" placeholder="班级"></td>
          	<td>
          		<input type="text" name="u_email" class="form-control" placeholder="邮箱">
          	</td>
          	<td>
          		<input type="text" name="u_tel" class="form-control" placeholder="电话">
          	</td>
          	<td><button type="submit"  class="btn btn-default">提交</button></td>
          </form>
          </tr> 
        </table>
        <footer>  
        
            
         
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