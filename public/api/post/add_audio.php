<?php

$thing = $_FILES['audio'];
$name = $_POST['id'];
$destination_path = getcwd().DIRECTORY_SEPARATOR;
print($destination_path);

$target_file = $destination_path."post/sounds/audio.mp3";

move_uploaded_file($_FILES['audio']['tmp_name'], $target_file);

require_once('get/store_audio.php');

if(empty($_POST)){ 
	$output['errors'] = 'missing data';
}

$author=$_POST['author_name'];
$audioName=$_POST['audio_name'];
$user_id=$_POST['user_id'];

$query = "INSERT INTO `audio`(`author_name`, `audio_name`, `user_id`, `likes`) VALUES ('$author', '$audioName', '$user_id', 0)";
// INSERT INTO `user_feedback` (`id`, `likes`, *`audio_id`*) VALUES (NULL, '0', ' *audio_id* ');

$result = mysqli_query($conn, $query);

if(empty($result)){ 
	$output['errors'] = 'database error';
}else { 
	if(mysqli_affected_rows($conn)){
		$output['success'] = true;
	}else {
		$output['errors'] = 'insert error';
	}
}

?>