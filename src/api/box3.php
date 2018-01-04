<?php
	$file_url = '../data/box3.json';
	$myfile = fopen($file_url,'r');
	$content = fread($myfile,filesize($file_url));
	$res_data = json_decode($content);
	echo JSON_encode($res_data,JSON_UNESCAPED_UNICODE);
//	fcolse($myfile);
//	var_dump($res_data)
?>