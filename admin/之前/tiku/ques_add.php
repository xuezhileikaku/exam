<?php








?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
<title>添加试题</title>

<script type="text/javascript" charset="utf-8" src="../js/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="../js/ueditor/ueditor.all.min.js"> </script>
</head>

<body class="ContentBody">
<form action="savecourse.php" method="post" enctype="multipart/form-data" name="form" target="mainFrame" >
	<div class="MainDiv">
试题题目:<textarea  rows="2"></textarea><br/>
选项A、<input name="answer_a" type="textarea" /><br/>
选项B、<input name="answer_b" type="textarea" /><br/>
选项C、<input name="answer_c" type="textarea" /><br/>
选项D、<input name="answer_d" type="textarea" /><br/>
知识点：<input name="knowledge[]" type="text" /><br/>
知识点：<input name="knowledge[]" type="text" /><br/>
知识点：<input name="knowledge[]" type="text" /><br/>
知识点：<input name="knowledge[]" type="text" /><br/>
试题答案：<textarea  rows="3"></textarea><br/><br/>
	</div>
</form>
</body>
</html>