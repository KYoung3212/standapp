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

$id = $_POST['audio_id'];

// $query = "SELECT `author_name`, `audio_name`, `a`.`id`, `c`.`comment`, `c`.`comment_time`
//             FROM `audio` AS `a`
//             JOIN `comments` AS `c`
//                 ON `c`.`audio_id` = `a`.`id`
//             WHERE `a`.`id` = $id";

$query = "SELECT `author_name`, `audio_name`, `a`.`id`
            FROM `audio` AS `a`
            WHERE `a`.`id` = $id";

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
            
            // try {
               
            //     // Get the object.
            //     $audio = $s3->getObjectUrl($bucket, $audio_key);
            
            //     header("Content-Type: {$audio['ContentType']}");
            //     // echo $result['Body'];
                
            // } catch (S3Exception $e) {
            //     echo $e->getMessage() . PHP_EOL;
            // }
        }
        json_encode($output);
	}else {		
		$output['errors'] = 'no data';
	}
}