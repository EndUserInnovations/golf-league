<?php
// golf/api/config.php

ob_start();
header('Content-Type: application/json; charset=utf-8');

// --- DB CONFIG ---
$DB_HOST = 'p3nlmysql117plsk.secureserver.net';
$DB_PORT = 3306;
$DB_NAME = 'golfleague';
$DB_USER = 'golfleague';
$DB_PASS = 'SlideJ0b1'; // <-- set this
$DEBUG   = true;

function get_pdo() {
  global $DB_HOST, $DB_PORT, $DB_NAME, $DB_USER, $DB_PASS;

  $dsn = "mysql:host={$DB_HOST};port={$DB_PORT};dbname={$DB_NAME};charset=utf8mb4";

  return new PDO($dsn, $DB_USER, $DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ]);
}

function json_ok($data = []) {
  echo json_encode(array_merge(['ok' => true], $data));
  exit;
}

function json_fail($message, $status = 500) {
  http_response_code($status);
  echo json_encode(['ok' => false, 'error' => $message]);
  exit;
}
