<?php
$zipcode="30319";
$apiKeyMaps = '1F2bEXGQTqWLGwBuqi5Vfty7Ent0lcPu';
$query = "https://www.mapquestapi.com/geocoding/v1/address?key=$apiKeyMaps&inFormat=kvp&outFormat=json&location=$zipcode&thumbMaps=false";
$data = file_get_contents($query);
if($data){
  $data = json_decode($data);
  $longitude = $data->Placemark[0]->Point->coordinates[0];
  $latitude = $data->Placemark[0]->Point->coordinates[1];
  var_dump(array($latitude,$longitude));

}else{
  var_dump(array(0,0));
}

 ?>
