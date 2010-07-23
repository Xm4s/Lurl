<?php

/*
 * Lurl PHP Gateway
 * 
 * by Marco 'Xmas' Colombo <marco.natale.colombo AT gmail DOT com>
 * Copyright (C) 2010 Marco Natale Colombo. All Rights Reserved.
 *
 */

echo send();

function send() {

	$request = collect_data();
	
	$url = prepare_url($request['url']);
		
	$opts = prepare_options($request['method'], $request['data']);
		
	$context = stream_context_create($opts);
	$fd = fopen($url, 'r', false, $context);
	$response = stream_get_contents($fd);
	fclose($fd);
		
	return htmlentities($response, ENT_QUOTES);
}

function collect_data() {
	
	if($_SERVER['REQUEST_METHOD'] == 'POST') {
		$params = $_POST;
	} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
		$params = $_GET;
	}
		
	$request['url'] = $params['__url'];
	unset($params['__url']);
	
	$request['method'] = $params['__method'];
	unset($params['__method']);
	
	$request['data'] = '';
	if(count($params) > 0) {
		$request['data'] = http_build_query($params);
	}
	
	return $request;
}

function prepare_url($url) {
	
	$url = explode('://', $url, 2); 
	
	if(count($url) == 1) {
		array_unshift($url, 'http');
	}
	
	$url = implode('://', $url);
			
	return $url;
}

function prepare_options($method, $data) {
	
	$header = 'Content-type: application/x-www-form-urlencoded' . "\r\n";
	$header .= 'Content-Length: ' . strlen($data) . "\r\n";

	$opts = array(
		'http' => array(
			'method' => $method,
			'header' =>  $header,
			'content' => $data
		)
	);
	
	return $opts;
}

?>