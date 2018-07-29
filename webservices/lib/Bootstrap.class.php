<?php
include 'config.php';
class Bootstrap{
	public function __construct($params)
	{ 
		$controller = FOLDER.'/controller/'.ucfirst($params["page"]).'.php';
		
		if(!file_exists($controller))
		{
			$file = 'defined Controller';
			include FOLDER.'/view/error.html';
			exit;
		}
		include $controller;
		$controller_class = ucfirst($params["page"]);
		if(!class_exists(ucfirst($params["page"]))){
			$file = 'defined Controller class';
			include FOLDER.'/view/error.html';
			exit;
		}
		$obj = new $controller_class();
		$obj->getCustomer("hello");

		return true;;
	}
}
?>