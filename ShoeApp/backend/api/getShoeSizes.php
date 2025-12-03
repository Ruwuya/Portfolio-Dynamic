<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/../db.php';

$sql = "SELECT id, shoe_size FROM shoesizes ORDER BY shoe_size";
$result = $conn->query($sql);

$sizes = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $sizes[] = [
            "id"        => (int)$row["id"],
            "shoe_size" => (float)$row["shoe_size"],
        ];
    }

    echo json_encode($sizes);
} else {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => $conn->error
    ]);
}