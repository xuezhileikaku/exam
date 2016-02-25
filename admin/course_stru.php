<?php
include("../ini.php");
include("../funs.php");
include("./public/head.php");
include("./public/menu.php");
include("./public/side.php");
$id=$_GET['id'];
$res=$pdo->query("select * from exam_know_bank WHERE co_id={$id}");
$res->setFetchMode(PDO::FETCH_ASSOC);
foreach ($res->fetchAll() as $key => $v) {
	$know_arr[$v['know_id']] =$v['know_name'];	
}

?>
<section id="main" class="column" style="height: 1685px;">
	<article class="module width_full">
		<header><h3 class="tabs_involved">知识点结构</h3>
		<ul class="tabs">
   			<li class="active"><a href="#tab2">邻接矩阵A</a>
   			</li>
    		<li >
    			<a href="#tab1">可达矩阵R</a>
    		</li>
		</ul>
		</header>
		<div class="tab_container">
			<form action="course_stru.php" method="post">
			<div id="tab2" class="tab_content" style="display: none;">
			<table class="tablesorter" cellspacing="0"> 
			    <thead> 
			        <tr> 
			        <th></th>
			        <?php
			        foreach ($know_arr as $value) {
			        	echo "<th class='header'>".$value."</th>";
			        }
			        ?>
			        </tr> 
			    </thead> 
		     	<tbody> 
		          <?php
		          $n=count($know_arr);
		          foreach ($know_arr as $v) {
		            echo '<tr  ><td>'.$v."</td>";
		            for ($i=0; $i <$n ; $i++) { 
		            	echo "<td><input type='text' style='width:40px;'/></td>";
		            }
		            echo '</tr>';//
			      }
			      	?>
		      	</tbody>  
		    </table>
			<footer>
			</footer>
			</div>	<!-- end of #tab2 -->
		</div>
		</form>
	</article>
</section>