<?php

include "DB.class.php";
class Model
{
	public $connect;
	public function __construct()
	{	
		$this->connect = new DB();
	}
}
?>