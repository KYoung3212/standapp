<?php

$comment=$_POST['comment'];
$commentTime=$_POST['comment_time'];
$audioID=$_POST['audio_id'];

$query = "INSERT INTO `comments`(`comment`, `comment_time`, `audio_id`) VALUES ('$comment', '$commentTime', '$audioID')";

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