<?php
include("../ini.php");
include("../funs.php");
if (!empty($_GET)) {
	if ($_GET['ac']=='ed') {
		jumpUrl("course_edit.php".$_GET['id'],"编辑课程");//编辑课程		
	}elseif ($_GET['ac']=='del') {
		$sql="delete from exam_course where co_id={$_GET['id']}";
		$res=$pdo->exec($sql);//
		jumpUrl("course.php","删除成功");
	}elseif ($_GET['ac']=='test') {
		jumpUrl("course_test.php?id=".$_GET['id'],'进入考试');//编辑课程
	}
}
include"./public/head.php";

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
             <li ><a href="./home/index.php">Course</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <form class="navbar-form navbar-right" action="log.php" method="post">
            <div class="form-group">
              <input type="text" placeholder="Email" name="email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" name="pwd" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

	<div class="container-fluid">
    <h2 align="center">课程列表</h2>
    <div>
      
    </div>
    <table class="table table-striped" >
      <tr align="center" class="active">
        <td style="width:5%;">
          id
        </td>
        <td style="width:10%;">
          课程名
        </td>
        <td style="width:40%;">
          课程描述
        </td>
        
        <td style="width:20%;">
          测试
        </td>
      </tr>
      <?php
      foreach ($pdo->query("select * from exam_course") as $row) {
            echo '<tr align="center" ><td>';
            echo $row['co_id'];//课程id
            echo "</td><td>";
            echo $row['co_name']; //课程名
            echo "</td><td>";
            echo $row['co_desc']; //课程描述
            echo "</td><td><a href=\"index.php?ac=test&id={$row['co_id']}\">进入考试</a></td></tr>";
        }

      ?>
      
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
            <input type="text" name="co_cat" class="form-control" placeholder="本课程介绍">
          </div>
          <button type="submit"  class="btn btn-default">提交</button>
        </form>
      </div>
  </div>

  <?php include"./public/foot.php";?>
 