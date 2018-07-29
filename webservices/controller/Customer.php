<?php
include 'model/Customer_Model.class.php';
class Customer extends Controller{
	
	public function getCustomer($params){
		$obj = new Customer_Model();
		
		return $obj->getCustomer($params);
	}
}