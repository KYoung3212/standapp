<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$audio_id = $_POST['audio_id'];
$user_id = $_POST['id'];

$query = "UPDATE `audio` SET `likes`=(`likes`-1) WHERE `id`=$audio_id"; 

$result1 = mysqli_query($conn, $query);

if(empty($result1)){  
	$output['errors'] = 'database error';
}else { 
	if(mysqli_affected_rows($conn)){
		$output['success'] = true;
	}else {
		$output['errors'] = 'update error';
	}
}

?>