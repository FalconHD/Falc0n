<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Max-Age: 600');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../backend/bootstrap.php';

// Init Core Library
$init = new Core;
