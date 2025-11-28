<?php

require_once __DIR__ . '/config.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if(!$conn -> set_charset('utf8mb4')){
    http_response_code(500);
    echo json_encode(["error" => "Failed to set DB charset"]);
    exit;
}

if($conn -> connect_error){
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

?>