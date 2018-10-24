<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$token=$_POST['token'];
$avatar=$_POST['avatar'];

$query = "UPDATE `users` SET `avatar` = '$avatar' WHERE `users`.`password` = '$token'";

$result = mysqli_query($conn, $query);

if(empty($result)){ 
	$output['errors'] = 'database error';
}else { 
	if(mysqli_affected_rows($conn)){
		$output['success'] = true;
	}else {
		$output['errors'] = 'failed to add user error';
	}
}

?>