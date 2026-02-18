<?php
require_once __DIR__ . '/../config.php';

try {
  $pdo = get_pdo();

  $stmt = $pdo->query("
    SELECT id, team_id, first_name, last_name, handicap, created_at
    FROM players
    ORDER BY team_id, last_name, first_name
  ");

  $players = $stmt->fetchAll();

  json_ok([
    'players' => $players
  ]);

} catch (Throwable $e) {
  json_fail($e->getMessage(), 500);
}
