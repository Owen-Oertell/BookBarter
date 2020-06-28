<?php
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

$jwt = htmlspecialchars_decode($_GET["jwt"]);
$bookArray = json_decode(htmlspecialchars_decode($_GET["bookArray"]));

$credentials = json_decode(include "verifyJWT.php");
if($credentials == "This key has been tampered with or is out of date." || $credentials == "Please Provide a JSON Web Token.") {
    echo $credentials;
    return $credentials;
}
foreach($bookArray as &$book) {
    $bookData = file_get_contents("https://openlibrary.org/api/books?bibkeys=ISBN:$book->ISBN&jscmd=data&format=json");
    $bookData = json_decode($bookData, true);
    $book->title = $bookData["ISBN:$book->ISBN"]['title'];
    $book->author = $bookData["ISBN:$book->ISBN"]['authors'][0]['name'];
    $book->imageURL = $bookData["ISBN:$book->ISBN"]['cover']['large'];

}
$client = new MongoDB\Client('mongodb+srv://dbrunner:AWsAcctcHfb1g8FG@cluster0-vixlf.mongodb.net/hackathon?retryWrites=true&w=majority');
$collection = $client->hackathon->userdata;
$collection->updateOne(["username" => $credentials->username], ['$set' => ['books' => $bookArray]]);
echo "Books sucessfully added";
?>
