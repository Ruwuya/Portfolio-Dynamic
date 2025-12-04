<?php
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/../db.php';

{/* loading using a view */}
$sql = "SELECT Name, Age, Email, ShoeSize FROM v_users_shoesize";
$result = $conn->query($sql);

$users = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);
?>