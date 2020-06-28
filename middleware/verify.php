<?php
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
$jwt = htmlspecialchars_decode($_GET["jwt"]);
echo (include "verifyJWT.php");
?>
