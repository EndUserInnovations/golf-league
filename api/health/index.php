<?php
require_once __DIR__ . '/../config.php';

try {
  json_ok([
    'service' => 'golf-league-api',
    'time' => gmdate('c')
  ]);
} catch (Throwable $e) {
  json_fail($e->getMessage(), 500);
}
