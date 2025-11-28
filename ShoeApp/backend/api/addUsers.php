<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require_once __DIR__ . '/../db.php';

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