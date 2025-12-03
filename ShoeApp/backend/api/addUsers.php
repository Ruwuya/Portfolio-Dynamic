<?php

// ===== CORS HEADERS =====
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST for real work
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status"  => "error",
        "message" => "Method not allowed. Use POST."
    ]);
    exit;
}

require_once __DIR__ . '/../db.php';

// Read raw body
$raw = file_get_contents("php://input");
if (!$raw) {
    http_response_code(400);
    echo json_encode([
        "status"  => "error",
        "message" => "Missing request body"
    ]);
    exit;
}

// Decode JSON
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "status"  => "error",
        "message" => "Invalid JSON body"
    ]);
    exit;
}

// Extract & very basic validate
$first = trim($data["first_name"] ?? "");
$last  = trim($data["last_name"] ?? "");
$age   = isset($data["age"]) ? (int)$data["age"] : null;
$email = trim($data["email"] ?? "");
$size  = isset($data["shoesize_id"]) ? (int)$data["shoesize_id"] : null;

if ($first === "" || $last === "" || !$age || $email === "" || !$size) {
    http_response_code(400);
    echo json_encode([
        "status"  => "error",
        "message" => "Missing or invalid fields"
    ]);
    exit;
}

// Escape + build SQL
$firstEsc = $conn->real_escape_string($first);
$lastEsc  = $conn->real_escape_string($last);
$emailEsc = $conn->real_escape_string($email);

$sql = "
    INSERT INTO users (first_name, last_name, age, email, shoesize_id)
    VALUES (
        '$firstEsc',
        '$lastEsc',
        $age,
        '$emailEsc',
        $size
    )
";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => $conn->error
    ]);
}