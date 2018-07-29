<?php

// Base Controller
include 'Model.class.php';
class Controller{

    // Base Controller has a property called $loader, it is an instance of Loader class(introduced later)

    protected $model;


    public function __construct(){
    	$model = new Model(); 
    	$this->model = $model;

	}
}