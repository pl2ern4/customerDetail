<?php


class Customer_Model extends Model{
	public function __construct(){
		parent::__construct();//explicit call to parent constructor
	}
	function createcustomerTable(){ 
		$sql = "CREATE TABLE customer (
		user_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
		id INT(6) NOT NULL,
		first_name VARCHAR(30) NOT NULL,
		last_name VARCHAR(30) NOT NULL,
		email VARCHAR(50),
		gender VARCHAR(20),
		ip_address VARCHAR(50),
		company VARCHAR(50),
		city VARCHAR(50),
		title VARCHAR(100),
		website VARCHAR(500)
		)";

		$dbresp = $this->connect->exec($sql);
		if(!$dbresp){
			return false;
		}else{
			return true;
		}
	}
	function isTableExist(){
		$isDbExist = "select 1 from customer;";
		$dbresp = $this->connect->exec($isDbExist);
		if(!$dbresp){
			return false;
		}
		return true;
	}
	function insertDataInTable(){
		$filepath='C:\xampp\htdocs\test\customers.csv'; 
		if (($getdata = fopen($filepath, "r")) !== FALSE) { 
					   fgetcsv($getdata);   
				   while (($data = fgetcsv($getdata)) !== FALSE) {
							$fieldCount = count($data);
							for ($c=0; $c < $fieldCount; $c++) {
							  $columnData[$c] = $data[$c];
							}
					 $id = $this->connect->escapeString($columnData[0]);
					 $first_name = $this->connect->escapeString($columnData[1]);
					 $last_name = $this->connect->escapeString($columnData[2]);
					 $email = $this->connect->escapeString($columnData[3]);
					 $gender = $this->connect->escapeString($columnData[4]);
					 $ip_address = $this->connect->escapeString($columnData[5]);
					 $company = $this->connect->escapeString($columnData[6]);
					 $city = $this->connect->escapeString($columnData[7]);
					 $title = $this->connect->escapeString($columnData[8]);
					 $website = $this->connect->escapeString($columnData[9]);
					 $import_data[] ='("'.$id.'","'.$first_name.'","'.$last_name.'","'.$email.'","'.$gender.'","'.$ip_address.'","'.$company.'","'.$city.'","'.$title.'","'.$website.'")'; 
					// SQL Query to insert data into DataBase
					 
			}
			$import_data = implode(',', $import_data);
			$query ="INSERT INTO customer (id,first_name,last_name,email,gender,ip_address,company,city,title,website) VALUES ".$import_data.";";
			if ($this->connect->exec($query)) {
			    // echo "data inserted successfully";
			    return true;
			} else {
			    return false;
			}
 		fclose($getdata);
	}
	return false;
	}

	public function getCustomer($params){
		
		$rows = [];
		$data_retrive = "";;
		if($this->isTableExist()){ 
			$data_retrive = $this->getCustomerDetail();
			
			if(!$data_retrive){
				header("Access-Control-Allow-Origin: *");
				header('Content-Type: application/json');
				json_encode([]);
				die();
			}
			$sql = "select * from customer limit 30";
			$result = $this->connect->exec($sql);
			while ($row = $result->fetch_assoc()) {
			  $data[] = $row;
			}
			// echo "<pre>";
			// print_r($l);
			header("Access-Control-Allow-Origin: *");
			header('Content-Type: application/json');
			echo json_encode($data);
			die;
		}
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json');
				echo json_encode([]);
				die();
	}

	public function getCustomerDetail()
	{
		if(!$this->isTableExist()){ 
			$this->createcustomerTable();
		}
		$exist =$this->isTableExist();
		
		if($exist){  
			if($this->insertDataInTable())
			{
				// echo "Data Inserted successfully";
				return true;
			}
			else{
				echo "Sorry Data Cant Inserted";
				return false;
			}
		}
	}
}
?>