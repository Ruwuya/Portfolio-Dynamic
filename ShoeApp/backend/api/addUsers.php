<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

// Handle preflight OPTIONS request and exit early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just send the headers above and stop here
    http_response_code(204); // No Content is fine
    exit;
}

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

// Read raw JSON body
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Basic validation of JSON
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "status"  => "error",
        "message" => "Invalid JSON body"
    ]);
    exit;
}

// Extract & sanitize fields
$first = $conn->real_escape_string($data["first_name"] ?? "");
$last  = $conn->real_escape_string($data["last_name"] ?? "");
$age   = (int)($data["age"] ?? 0);
$email = $conn->real_escape_string($data["email"] ?? "");
$size  = (int)($data["shoesize_id"] ?? 0);

// (You can add more validation here: required fields, ranges, etc.)
if ($first === "" || $last === "" || $age <= 0 || $email === "" || $size <= 0) {
    http_response_code(400);
    echo json_encode([
        "status"  => "error",
        "message" => "Missing or invalid fields"
    ]);
    exit;
}

// Insert into DB
$sql = "
    SELECT CONCAT(u.first_name, ' ', u.last_name) AS Name,
    u.age AS Age,
    s.shoe_size AS ShoeSize
    FROM users u
    JOIN shoesizes s ON u.shoesize_id = s.id;
";

$result = $conn -> query($sql);

$rows = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
}

echo json_encode($rows);

?>