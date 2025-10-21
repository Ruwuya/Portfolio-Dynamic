<?php
header('Content-Type: application/json');
include_once '../db.php';

$sql = "SELECT * FROM projects";
$result = $conn->query($sql);

$projects = [];
while ($row = $result->fetch_assoc()) {
    $projects[] = $row;
}

echo json_encode($projects);
?>