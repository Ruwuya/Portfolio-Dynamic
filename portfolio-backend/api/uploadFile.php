<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Allow-Headers: Content-Type");
header ("Access-Control-Allow-Methods: POST, OPTIONS");
header ("Content-Type: application/json");

$target_dir = "../uploads/";

if (!isset($_FILES["file"]) || $_FILES["file"]["error"] !== UPLOAD_ERR_OK) {
    echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
    exit;
}

// Max 10 MB
if ($_FILES["file"]["size"] > 10 * 1024 * 1024) {
    echo json_encode(["error" => "File is too large."]);
    exit;
}

// Check the actual file contents, not just the name the browser sent
$finfo = new finfo(FILEINFO_MIME_TYPE);
if ($finfo->file($_FILES["file"]["tmp_name"]) !== "application/pdf") {
    echo json_encode(["error" => "Only PDF files are allowed."]);
    exit;
}

// Random name, so uploads can't overwrite existing files or sneak in odd names like "x.php.pdf"
$target_file = $target_dir . bin2hex(random_bytes(16)) . ".pdf";

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    echo json_encode(["success" => true , "filePath" => $target_file]);
} else {
    echo json_encode(["error" => "Sorry, there was an error uploading your file."]);
}

?>
