<?php
require_once('../../config/db.php');
require_once('db_connect.php');
$output=[];
$_POST = json_decode(file_get_contents('php://input'), true);

$token=$_POST['token'];

$query = "SELECT `id`, `avatar` FROM `users` WHERE `password` = '$token'";

$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0 ) {
  $output['data']=[];
  while( $row = mysqli_fetch_assoc($result) ){
      $output['data'][] = $row;
  }
} else {
  $output['errors'][] = 'Invalid Search ID. No data.';
}

$jsonOutput = json_encode($output);

$result->close();
$conn->close();

?>