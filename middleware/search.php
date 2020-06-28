<?php
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

$jwt = htmlspecialchars_decode($_GET["jwt"]);
$query = json_decode(htmlspecialchars_decode($_GET["query"]));
$distance = json_decode(htmlspecialchars_decode($_GET["distance"]));
$credentials = json_decode(include "verifyJWT.php");
if($credentials == "This key has been tampered with or is out of date." || $credentials == "Please Provide a JSON Web Token.") {
    echo $credentials;
    return $credentials;
}

$client = new MongoDB\Client('mongodb+srv://dbrunner:AWsAcctcHfb1g8FG@cluster0-vixlf.mongodb.net/hackathon?retryWrites=true&w=majority');

$newCollection = $client->hackathon->traderoom;
$cursor = $newCollection->find([]);
$viable_query = [];

foreach($cursor as $document){
    $zipcode1 = $document->zipcode;
    $zipcode2 = $credentials->zip;
    $difference = include "zipCompare.php";
    if(floatval($difference) > floatval($distance)){
        continue;
    } else {
        if(strstr(strtolower($document->author), strtolower($query)) != -1 || strstr(strtolower($document->title), strtolower($query)) != -1){
            array_push($viable_query,$document);
        }
    }
}
echo json_encode($viable_query);
?>
