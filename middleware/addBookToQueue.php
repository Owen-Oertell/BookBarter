<?php
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

$jwt = htmlspecialchars_decode($_GET["jwt"]);
$isbn = htmlspecialchars_decode($_GET["isbn"]);
$credentials = json_decode(include "verifyJWT.php");
if($credentials == "This key has been tampered with or is out of date." || $credentials == "Please Provide a JSON Web Token.") {
    echo $credentials;
    return $credentials;
}

$client = new MongoDB\Client('mongodb+srv://dbrunner:AWsAcctcHfb1g8FG@cluster0-vixlf.mongodb.net/hackathon?retryWrites=true&w=majority');
$collection = $client->hackathon->userdata;

$document = $collection->findOne(["username" => $credentials->username]);
$books = $document->books;
foreach ($books as $bk) {
    if($bk->ISBN == $isbn) {
        $bk->copies--;
    }
}
$collection->updateOne(["username" => $credentials->username], ['$set' => ['books' => $books]]);

$collection = $client->hackathon->traderoom;
$collection->insertOne([
    "seller" => $credentials->username,
    "isbn" => $isbn,
    "zipcode" => $credentials->zip,
    "tradeMade" => false,
    "dateCreated" => time(),
    "queue" => []
]);
echo "Book added sucessfully";
?>
