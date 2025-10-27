<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Safely include db.php from the same directory
include_once '../db.php';

// Check connection
if ($conn->connect_error) {
    die("❌ Database connection failed: " . $conn->connect_error);
} else {
    echo "✅ Connected successfully to " . DB_NAME;
}
?>
