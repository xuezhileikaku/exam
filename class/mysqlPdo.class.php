<?php
/*
*
*
*/
class MysqlPdo{
	private $config;
  	private $longLink;
  	private $pdo;
	 //私有构造函数 防止被直接实例化
  	private function __construct($config, $longLink = false) {
	    $this->config['server'] = $dsn;
	    $this->config['user'] = $DBUser;
	    $this->config['pwd'] = $DBPwd;
	    $this->longLink = $longLink;
	    $this->connect();
	  }
 	//私有 空克隆函数 防止被克隆
  	private function __clone(){}
  	//静态 实例化函数 返回一个pdo对象
	static public function instance($dsn, $DBUser, $DBPwd, $longLink = false){
	    static $singleton = array();//静态函数 用于存储实例化对象
	    $singIndex = md5($dsn . $DBUser . $DBPwd . $longLink);
	    if (empty($singleton[$singIndex])) {
	      $singleton[$singIndex] = new self($dsn, $DBUser, $DBPwd, $longLink = false);
	    }
	    return $singleton[$singIndex]->pdo;
	}
    
  private function connect(){
    try{
      if($this->longLink){
        $this->pdo = new PDO($this->DSN, $this->DBUser, $this->DBPwd, array(PDO::ATTR_PERSISTENT => true));
      }else{
        $this->pdo = new PDO($this->DSN, $this->DBUser, $this->DBPwd);
      }
      $this->pdo->query('SET NAMES UTF-8');
    } catch(PDOException $e) {
      die('Error:' . $e->getMessage() . '<br/>');
    }
  }
}


	//
	funciton __construct(){
		$CON= new PDO("mysql:host=localhost;dbname=db_demo","root",""); 
		if($pdo -> exec("insert into db_demo(name,content) values('title','content')")){ 
		echo "插入成功！"; 
		echo $pdo -> lastinsertid(); 
	}
	

	//插入
	funciton inse(){

	}

	//查询
	funciton sele(){
		$re=$pdo->query("select * from exam_course");
		$re->setmode

		$sql="select * from news where id='".$_GET['id']."'"; 
$query=mysql_query($sql); 
	}
	//删除
	funciton dele(){
		$sql="delete from news where id ='$d'"; } 
		$query=mysql_query($sql);
	}
	//更新

	funciton upde($table,$arr,$prid){
		$sql="UPDATE exam_ques_bank SET ques_title = \"{$title}\", answer_a=\"{$an_a}\", answer_b=\"{$an_b}\",answer_c=\"{$an_c}\",answer_d=\"{$an_d}\",answer=\"{$ans}\",analysis=\"{$ana}\",IRT_a=\"{$IRT_a}\",IRT_b=\"{$IRT_b}\",IRT_c=\"{$IRT_c}\" WHERE ques_id = \"{$id}\"";
		$sql="update news set title='$title',contents='$con' where id='$hid' limit 1 "; 
mysql_query($sql); 

	}
	funciton arrOut($arr){
		$str='';
		foreach ($arr as $k => $v) {
			$str.=$k."=\"{".
		}
	}
	 function 
}