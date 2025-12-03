<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/../db.php';

// Aggregated frequency of each shoe size
$sql = "
    SELECT 
        s.shoe_size AS shoe_size,
        COUNT(*)    AS count
    FROM users u
    JOIN shoesizes s ON u.shoesize_id = s.id
    GROUP BY s.shoe_size
    ORDER BY s.shoe_size
";

$result = $conn->query($sql);

$data = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            "shoe_size" => (float)$row["shoe_size"],
            "count"     => (int)$row["count"],
        ];
    }
    echo json_encode(["status" => "success", "data" => $data]);
} else {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => $conn->error
    ]);
}

?>