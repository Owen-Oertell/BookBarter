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
$userData = $client->hackathon->userdata;
$tradeRoom = $client->hackathon->traderoom;

$tradeDoc = $tradeRoom->findOne(['isbn' => $isbn, "seller" => $credentials->username]);
$topQueue = $tradeDoc->queue[0];
$tradeRoom->removeOne(['isbn' => $isbn, "seller" => $credentials->username]);

// Find the seller and increment their first book, decrement the other book.
$document = $userData->findOne(['username' => $credentials->username]);
$bookArray = $document->books;
$updated=false;
/*
while($i<count($bookArray)) {
    if($bookArray[$i]->ISBN == $tradeDoc->ISBN) {
        if($copies==1) {
            array_splice($bookArray, $i, $i);
        } else {
            $bookArray[$i]->copies--;
            $i++;
        }
    } else if ($bookArray[$i]->ISBN == $topQueue->replaceISBN) {
        $bookArray[$i]->copies++;
        $i++;
        $updated=true;
    } else {
        $i++;
    }
}
if(!$updated) {
    array_push($bookArray, [""])
}
*/

//echo json_encode($topQueue);
?>