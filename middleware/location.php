<?php
$zipcode=strval($zipcode);
$apiKeyMaps = '1F2bEXGQTqWLGwBuqi5Vfty7Ent0lcPu';
$query = "https://www.mapquestapi.com/geocoding/v1/address?key=$apiKeyMaps&inFormat=kvp&outFormat=json&location=$zipcode&thumbMaps=false";
$data = file_get_contents($query);
$data = json_decode($data, true);

if($data){
  $longitude = $data["results"][0]["locations"][0]["latLng"]["lat"];
  $latitude = $data["results"][0]["locations"][0]["latLng"]["lng"];
  return array($latitude, $longitude);

}else{
  return array(0,0);
}

?>
