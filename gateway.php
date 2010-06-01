<?php

if($_SERVER['REQUEST_METHOD'] == 'GET') {
	
	print_r($_GET);
	
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {	
	
	print_r($_POST);
}

?>