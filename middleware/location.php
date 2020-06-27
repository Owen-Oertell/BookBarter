<?php
$zipcode=strval($zipcode);
$apiKeyMaps = '1F2bEXGQTqWLGwBuqi5Vfty7Ent0lcPu';
$query = "https://www.mapquestapi.com/geocoding/v1/address?key=$apiKeyMaps&inFormat=kvp&outFormat=json&location=$zipcode&thumbMaps=false";
$data = file_get_contents($query);
if($data){
  $data = json_decode($data);
  $longitude = $data->results->locations->latLng->lat;
  $latitude = $data->results->locations->latLng->lng;
  return array($latitude,$longitude);

}else{
  return array(0,0);
}

?>
