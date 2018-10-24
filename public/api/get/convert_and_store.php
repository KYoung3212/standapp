<?php
require("../../aws/vendor/autoload.php");
// require($_SERVER['DOCUMENT_ROOT']."/aws/vendor/autoload.php");
require('secret_key.php');
require('api_key.php');

use \CloudConvert\Api;

$api = new Api($api_key);
 
$process = $api->createProcess([
    "inputformat" => "jpg",
    "outputformat" => "pdf",
]);

$process->start([
    "input" => [
        "s3" => [
            "accesskeyid" => $key,
            "secretaccesskey" => $secret,
            "bucket" => "standapp618"
        ],
    ],
    "file" => "../bucket/logo.jpg",
    "outputformat" => "pdf",
    "output" => [
        "s3" => [
            "accesskeyid" => $key,
            "secretaccesskey" => $secret,
            "bucket" => "standapp618",
        ],
    ],
]);
?>