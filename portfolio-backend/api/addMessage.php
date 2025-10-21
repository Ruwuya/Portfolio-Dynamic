<?php
header('Content-Type: application/json');
include_once '../db.php';

$data = json_decode(file_Get_contents('php://input'), true);

$name = $data->name;
$email = $data->email;
$message = $data->message;

$stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);
$stmt->execute();

echo json_encode(["status" => "success"]);
?>
