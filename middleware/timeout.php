<?php
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

$jwt = htmlspecialchars_decode($_GET["jwt"]);
$credentials = json_decode(include "verifyJWT.php");
if($credentials == "This key has been tampered with or is out of date." || $credentials == "Please Provide a JSON Web Token.") {
    echo $credentials;
    return $credentials;
}

$client = new MongoDB\Client('mongodb+srv://dbrunner:AWsAcctcHfb1g8FG@cluster0-vixlf.mongodb.net/hackathon?retryWrites=true&w=majority');
$collection = $client->hackathon->userdata;


$collection = $client->hackathon->traderoom;
$cursor = $collection->find(["seller" => $credentials->username]);

$returnArray = array();

foreach ($cursor as $document){
    if (count($document->queue) >= 1) {
        array_push($returnArray, $document);
    }
}
echo json_encode($returnArray);
?>
