<?php 
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

if(empty($jwt)) {
    return "Please Provide a JSON Web Token.";
}
try{
    $decoded = JWT::decode($jwt, "41ffetjVjyQ5EaIDDbNuclXG7jaSGPijL5nAp2GVSYod8kGaCjcETQHGGdB5f1WswZurPSw0bJaYTJCq", array('HS256'));
    if($decoded->eat < time()) {
        throw new Exception("Error Processing Request", 1);
    }
    
    //echo json_encode($decoded);
    return json_encode($decoded);
} catch (Exception $e)  {
    return "This key has been tampered with or is out of date.";
};
?>