<?php
if(isset($_GET['info'])){
	$info = $_GET['info'];

	if($info == 'load'){
		$result = '<div class="n1">load内容</div>';
		echo $result;
		exit;
	}
}
?>
