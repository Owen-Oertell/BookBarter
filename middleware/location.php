<?php

$apiKeyMaps = 'AlzaSyDVE0fiTK1YUD67bu0y8j3HTLRQIL_rmek';
$query = "http://maps.google.co.us/map/geo?q=".urlencode($zipcode)."&output=json&key=".$apiKeyMaps;
$data = file_get_contents($query);

if($data){
  $data = json_decode($data);
  $longitude = $data->Placemark[0]->Point->coordinates[0];
  $latitude = $data->Placemark[0]->Point->coordinates[1];
  return array($latitude,$longitude);

}else{
  return array(0,0)
}

 ?>
