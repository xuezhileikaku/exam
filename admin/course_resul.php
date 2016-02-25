<?php
include("../ini.php");
include("../funs.php");
include("./public/head.php");
include("./public/menu.php");
include("./public/side.php");


?>
<section id="main" class="column" style="height: 1685px;">
  <article class="module width_full">
    <header>
        <h3 class="tabs_involved">测试结果</h3>
        
    </header>
    <div class="tab_container">
      <div id="tab1" class="tab_content" style="display: block;">
        <table class="tablesorter" cellspacing="0"> 
          <thead> 
            <tr> 
                <th class="header" >id</th> 
                <th class="header" >课程</th> 
                <th class="header" >测试者</th>
                <th class="header" >用时（秒为单位）</th> 
                <th class="header" >结果</th>
                <th>
                	
                </th>
                 
            </tr> 
          </thead> 
          <tbody> 
          <?php
              foreach ($pdo->query("select * from exam_test") as $k => $row) {
                echo '<tr><td>';
                echo $k;//
                echo "</td><td>";
                echo $row['co_id']; //课程id
                echo "</td><td>";
                echo $row['u_id']; //课程测试
                echo "</td><td>";
                echo $row['time_e']-$row['time_s']; //用时
                echo "</td><td>";
                $arr=explode(",", $row['result']);//试题
                foreach ($arr as $key => $value) {
                	echo ($key+1)."题、id:";
                	foreach (explode(":", $value) as $k => $v) {
                		if ($k%2) {
                			echo $v;
                		}else{
                			echo $v."结果：";
                		}
                	}
                	echo "<br/>";
                }
                echo "</tr>";
              }
          ?>
          </tbody> 
        </table>
      </div><!-- end of #tab1 -->
    </div><!-- end of .tab_container -->
    <footer>  
        
    </footer>    
  </article><!-- end of content manager article -->
</section>