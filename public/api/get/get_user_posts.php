<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require('../../aws/vendor/autoload.php');
require('secret_key.php');

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

$bucket = 'standup618';
$keyname = 'mattkirby';

$credentials = new Aws\Credentials\Credentials($key, $secret);
$s3 = new S3Client([
    'version' => 'latest',
    'region'  => 'us-west-1',
    'credentials' => $credentials,
    'scheme' => 'http'
]);

$id = $_POST['user_id'];

$query = "SELECT `u`.`id`, `username`, `audio_name`, `a`.`id`, `a`.`likes`
                FROM `users` AS `u`
                JOIN `audio` AS `a` 
                    ON `a`.`user_id` = `u`.`id` 
                WHERE `a`.`user_id` = $id
                ORDER BY `date_added` DESC";

$result = mysqli_query($conn, $query);

if(empty($result)){  
	$output['errors'] = 'database error';
}else { 
	if(mysqli_num_rows($result)>0){
		$output['success'] = true;
		while($row = mysqli_fetch_assoc($result)){
            $audio_key = $row['audio_name'];
            $audio_url = $s3->getObjectUrl($bucket, $audio_key);

            $row['audio_url'] = $audio_url;
            $output['data'][] = $row;
        }
        json_encode($output);
	}else {		
		$output['errors'] = 'no data';
	}
}