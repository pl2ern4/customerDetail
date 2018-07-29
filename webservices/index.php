<?php

require_once("lib/Bootstrap.class.php");
require_once("lib/Controller.class.php");
require_once("lib/Model.class.php");

// echo "<pre>";
// print_r($_GET);
// print_r($_POST);

$obj = new Bootstrap($_GET);
?>