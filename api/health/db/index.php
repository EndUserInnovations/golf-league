<?php
require_once __DIR__ . '/../../config.php';

try {
  $pdo = get_pdo();

  $row = $pdo->query("SELECT NOW() AS time")->fetch();
  $serverVersion = $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);

  json_ok([
    'db' => [
      'connected' => true,
      'time' => $row['time'] ?? null,
      'serverVersion' => $serverVersion
    ]
  ]);
} catch (Throwable $e) {
  json_fail($e->getMessage(), 500);
}
