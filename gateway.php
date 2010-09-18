<?php

/*
 * Lurl PHP Gateway
 * 
 * Copyright (C) 2010 Marco Natale Colombo. All Rights Reserved.
 * Released under GNU GPL Version 2
 *
 * by Marco 'Xmas' Colombo <jintetsu AT gmail DOT com>
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
	
	$header = join("\n", $http_response_header);
	$content = htmlentities($response, ENT_QUOTES);	
		
	return '<b>HEADER</b>' . "\n\n" . $header . "\n\n" . '<b>CONTENT</b>' . "\n\n" . $content;
}

function collect_data() {
	
	$params = $_GET;
	
	$request['url'] = $params['__url'];
	unset($params['__url']);
	
	$request['method'] = $params['__method'];
	unset($params['__method']);
	
	if(count($params) > 0) {
		$request['data'] = http_build_query($params);
	} else {
		$request['data'] = '';
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