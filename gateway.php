<?php

if($_SERVER['REQUEST_METHOD'] == 'GET') {
		
	$url = $_GET['__url'];
	unset($_GET['__url']);
	
	$method = $_GET['__method'];
	unset($_GET['__method']);
	
	if(count($_GET) > 0) {
		$data = http_build_query($_GET);
	} else {
		$data = '';
	}
		
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {	
		
	$url = $_POST['__url'];
	unset($_POST['__url']);
	
	$method = $_POST['__method'];
	unset($_POST['__method']);
	
	if(count($_POST) > 0) {
		$data = http_build_query($_POST);
	} else {
		$data = '';
	}
}

if(strpos($url, '://') === false) {
	$url = 'http://' . $url;
}

$header = 'Content-type: application/x-www-form-urlencoded' . "\r\n";
$header .= 'Content-Length: ' . strlen($data) . "\r\n";

$opts = array(
	'http' => array(
		'method' => $method,
		'header' =>  $header,
		'content' => $data
	)
);

//echo 'url: ' . $url . "\nmethod: " . $method . "\ndata: " . $data;

$context = stream_context_create($opts);
$fd = fopen($url, 'r', false, $context);
$response = stream_get_contents($fd);

echo $response;

?>