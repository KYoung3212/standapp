<?php

$query = "SELECT `avatar_id`, `author_name`, `audio_name` FROM `audio`";

$result = mysqli_query($conn, $query);


if (mysqli_num_rows($result)>0) {
    while($row = mysqli_fetch_assoc($result)) {
        $output['audio'][] = $row;
    }
    $output['success'] = true;

} else {    
        $output['message'] = 'No Items';
    }
    
?>