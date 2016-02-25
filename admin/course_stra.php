<?php
include("../ini.php");
include("../funs.php");

var_dump($_GET);
$re=$pdo->query("select * from exam_ques_bank where co_id=".$_GET['id']);
$re->SETMODE()
?>
<!DOCTYPE html>
<html lang="en"><head>
	<meta charset="utf-8">
	<title>项目反应理论后台管理</title>
	<link rel="stylesheet" href="./public/css/layout.css" type="text/css" media="screen">
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="./public/css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="./public/fly/fly.mini-all.js" type="text/javascript"></script>
    <link href="./public/fly/tree/skin/default/tree.css" rel="stylesheet" type="text/css" />
    <link href="./public/fly/demo/common/demo.css" rel="stylesheet" type="text/css" />
    <script src="./public/fly/demo/common/demo.js" type="text/javascript"></script>
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
  <article class="module width_full">
    <header>
        <h3 class="tabs_involved">关系列表</h3>
        <button style="float:right;" onclick="javascript:show();" class="btn">添加课程</button>
    </header>
    <div class="tab_container">
      <div id="treeContainer" class="tab_content" style="display: block;">
       
      </div><!-- end of #tab1 -->
    </div><!-- end of .tab_container -->  
  </article><!-- end of content manager article -->
</section>



<script type="text/javascript" id=code >
        var items = [{
            expanded: true,
            text: 'Library',
            items: [{
                text: 'Video',
                items: [{
                    text: 'My video'
                }, {
                    text: 'Public voide'
                }]
            }, {
                text: 'Picture',
                items: [{
                    text: 'My picture'
                }, {
                    text: 'Public picture'
                }]
            }, {
                text: 'Document',
                items: [{
                    text: 'My document'
                }, {
                    text: 'Public document'
                }]
            }, {
                text: 'Music',
                items: [{
                    text: 'My music'
                }, {
                    text: 'Public music'
                }]
            }, {
                text: 'Other'
            }]
        }]


        var tree = new fly.mini.Tree({
            container: "treeContainer",
            data: items
        });
</script>   	
<?php include("./public/foot.php");?>
  