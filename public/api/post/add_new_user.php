<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$username=$_POST['username'];
$password=$_POST['password'];
$email=$_POST['email'];

$query = "INSERT INTO `users`(`username`, `password`, `email`) VALUES ('$username', '$password', '$email')";

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