<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Headers: Content-Type");
header ("Access-Control-Allow-Methods: POST, OPTIONS");

$target_dir = "../uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

if ($fileType !== "pdf") {
    echo json_encode(["error" => "Only PDF files are allowed."]);
    exit;
}

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    echo json_encode(["success" => true , "filePath" => $target_file]);
} else {
    echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
}

?>