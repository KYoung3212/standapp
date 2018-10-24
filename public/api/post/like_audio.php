<?php

// takes in audio ID and changes table...
// { HEARTS } check if fill or not. and toggle accordingly
// { AUDIO } get current likes counter and +1
$_POST = json_decode(file_get_contents('php://input'), true);

// $name = $_POST['audio_name'];
$audio_id = $_POST['audio_id'];
$user_id = $_POST['id'];


$query = "UPDATE `audio` SET `likes`=(`likes`+1) WHERE `id`=$audio_id"; 

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


// $audioName = "SELECT `id` FROM `audio` WHERE `audio_name` = $name";
// $audioId = mysqli_query($conn, $audioName);

// $checkFeedback = "SELECT `audio_id` FROM `user_feedback` WHERE `user_id` = '$user_id'";
// $addFeedback = "UPDATE `user_feedback` SET `audio_id` = '$audio_id' WHERE `user_id` = '$user_id'";
// $updateFeedback = "UPDATE `user_feedback` SET `audio_id` = 0 WHERE `user_id` = '$user_id'";

// $result2 = mysqli_query($conn, $checkFeedback);

// if(empty($result2)){  
// 	$output['errors'] = 'database error';
// }else {
//     if($result2>0){
//         $delete = mysqli_query($conn, $updateFeedback);
//         return true;
//     }else if($result2===0){ 
//         print_r($result2);     
//         $add = mysqli_query($conn, $addFeedback);
//         return false;
//     }
// }

?>