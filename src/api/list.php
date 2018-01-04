<?php
	$pageNo = isset($_POST['pageNo']) ? $_POST['pageNo'] : 1;
	$qty = isset($_POST['qty']) ? $_POST['qty'] : 21;
	$file_url = '../data/list.json';
	$myfile = fopen($file_url,'r');
	$content = fread($myfile,filesize($file_url));
	$res_data = json_decode($content);
	$arr = array(
		'data'=>array_slice($res_data, ($pageNo-1)*$qty,$qty),
		'total'=>count($res_data),
		'qty'=>$qty		
	);
	echo JSON_encode($arr,JSON_UNESCAPED_UNICODE);
?>