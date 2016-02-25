<!DOCTYPE html>
<html lang="zn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <title>课程</title>

    <!-- Bootstrap core CSS -->
    <link href="./public/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="./public/css/course.css" rel="stylesheet">
     <script src="./public/js/jquery.min.js"></script>
    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="./js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="./public/js/ie-emulation-modes-warning.js"></script>
    <script type="text/javascript">

    $(document).ready(  function(){
      $("#co_add").hide();
    });
    function show(){
      $("#co_add").show();
    }
    function add(){
      var co_name=$("#co_name").value;
      alert(co_name);
    }
    </script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>