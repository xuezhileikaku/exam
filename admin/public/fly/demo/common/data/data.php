<?php
    header("Expires: Mon, 26 Jul 1970 05:00:00 GMT");      

    header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");      

    header("Cache-Control: no-cache, must-revalidate");      

    header("Pragma: no-cache");    
   
   sleep(1); 

   require "data.txt"; 
?>  