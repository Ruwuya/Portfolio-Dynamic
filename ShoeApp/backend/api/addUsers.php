<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require_once __DIR__ . '/../db.php';

// Read JSON body
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
    exit;
}

$first = $conn->real_escape_string($data["first_name"]);
$last  = $conn->real_escape_string($data["last_name"]);
$age   = (int)$data["age"];
$email = $conn->real_escape_string($data["email"]);
$size  = (int)$data["shoesize_id"];

$sql = "
    INSERT INTO users (first_name, last_name, age, email, shoesize_id)
    VALUES (
        '$first',
        '$last',
        $age,
        '$email',
        $size
    )
";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);
}
?>