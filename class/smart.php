<?php
//define smaryt dir
define('SMARTY_DIR','/smarty/');
//load smarty template
require(SMARTY_DIR.'Smarty.class.php');
$smarty = new Smarty();
var_dump($smarty);
