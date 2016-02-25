<?php
include("../ini.php");
include("../funs.php");
if (!empty($_GET)) {
  $id=$_GET['id'];
  //获取数据
  $sql="select co_id,co_name,co_cat,co_desc from exam_course WHERE co_id={$id}";
  $res=$pdo->query($sql);
  $res->setFetchMode(PDO::FETCH_ASSOC);
  $re_arr = $res->fetchAll();
}
if(!empty($_POST)){
    
    $id=$_POST['co_id'];
    $name=$_POST['co_name'];
    $cat=$_POST['co_cat'];
    $desc=$_POST['content'];
    
    $res=$pdo->exec("UPDATE exam_course SET co_name = \"{$name}\", co_cat=\"{$cat}\",co_desc=\"{$desc}\" WHERE co_id = \"{$id}\"");
    
    if($res){
      jumpUrl('./course.php','更新成功');
    }else{
      jumpUrl('./course.php','更新失败！');
    }
}

?>
<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="utf-8">
  <title>项目反应理论后台管理</title>
  
  <link rel="stylesheet" href="./public/css/layout.css" type="text/css" media="screen">
  <link rel="stylesheet" href="./public/editor/themes/default/default.css">
  <!--[if lt IE 9]>
  <link rel="stylesheet" href="./public/css/ie.css" type="text/css" media="screen" />
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <script charset="utf-8" src="./public/editor/kindeditor-min.js"></script>
  <script charset="utf-8" src="./public/editor/lang/zh_CN.js"></script>
  <script src="./public/js/jquery-1.5.2.min.js" type="text/javascript"></script>
  <script src="./public/js/hideshow.js" type="text/javascript"></script>
  <script src="./public/js/jquery.tablesorter.min.js" type="text/javascript"></script>
  <script type="text/javascript" src="./public/js/jquery.equalHeight.js"></script>
  <script type="text/javascript">
  $(document).ready(function() 
      { 
          $(".tablesorter").tablesorter(); 
     } 
  );
  $(document).ready(function() {

  //When page loads...
  $(".tab_content").hide(); //Hide all content
  $("ul.tabs li:first").addClass("active").show(); //Activate first tab
  $(".tab_content:first").show(); //Show first tab content

  //On Click Event
  $("ul.tabs li").click(function() {

    $("ul.tabs li").removeClass("active"); //Remove any "active" class
    $(this).addClass("active"); //Add "active" class to selected tab
    $(".tab_content").hide(); //Hide all tab content

    var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
    $(activeTab).fadeIn(); //Fade in the active ID content
    return false;
  });

});
    </script>
    <script type="text/javascript">
    $(function(){
        $('.column').equalHeight();
    });
</script>
<script>
      var editor;
      KindEditor.ready(function(K) {
        editor = K.create('textarea[name="content"]', {
          allowFileManager : true
        });
        K('input[name=getHtml]').click(function(e) {
          alert(editor.html());
        });
        K('input[name=isEmpty]').click(function(e) {
          alert(editor.isEmpty());
        });
        K('input[name=getText]').click(function(e) {
          alert(editor.text());
        });
        K('input[name=selectedHtml]').click(function(e) {
          alert(editor.selectedHtml());
        });
        K('input[name=setHtml]').click(function(e) {
          editor.html('<h3>Hello KindEditor</h3>');
        });
        K('input[name=setText]').click(function(e) {
          editor.text('<h3>Hello KindEditor</h3>');
        });
        K('input[name=insertHtml]').click(function(e) {
          editor.insertHtml('<strong>插入HTML</strong>');
        });
        K('input[name=appendHtml]').click(function(e) {
          editor.appendHtml('<strong>添加HTML</strong>');
        });
        K('input[name=clear]').click(function(e) {
          editor.html('');
        });
      });
</script>

</head>
<body>
  <header id="header">
    <hgroup>
      <h1 class="site_title"><a href="index.html">Website Admin</a></h1>
      <h2 class="section_title">Dashboard</h2><div class="btn_view_site"><a href="http://www.medialoot.com">View Site</a></div>
    </hgroup>
  </header> <!-- end of header bar -->
<?php
include("./public/menu.php");
include("./public/side.php");
?>
<section id="main" class="column" style="height: 1685px;">
    <article class="module " style="width:75%;">
      <header><h3>编辑课程</h3></header>
        <form action="course_edit.php" method="post">
        <div class="module_content">
            <fieldset>
              <label for="exampleInputName2">课程名</label>
              <input type="text" name="co_name" value="<?php echo $re_arr[0]['co_name'];?> " >
            </fieldset>
           <fieldset>
              <label for="exampleInputName2">课程描述</label>
              <textarea name="content" value="<?php echo $re_arr[0]['co_desc'];?>"></textarea>
            </fieldset>
        </div>
      <footer>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>课程分类:</span>
        <select name="co_cat" style="width:40%;">
             <option value="<?php echo $re_arr[0]['co_cat'];?>">文学</option>
            <option value="1">哲学</option>
             <option value="2">历史</option>
        </select>&nbsp; &nbsp;&nbsp;&nbsp; 
         <input type="hidden" name="co_id" value="<?php echo $re_arr[0]['co_id'];?> " >             
        <input type="submit" value="提交" class="alt_btn">
      </footer>
      </form>
    </article><!-- end of post new article -->
</section>    

 <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
   
    <script src="../public/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../public/js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>