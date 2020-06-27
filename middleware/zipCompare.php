<?php
    $coord1 = array(40.7128,-74.0060);
    $coord2 = array(34.0522,-118.2437);

    $lat1 = $coord1[0]
    $lat2 = $coord2[0]
    $lon1 = $coord1[1]
    $lon2 = $coord2[1]

    $latFrom = deg2rad($lat1);
    $lonFrom = deg2rad($lon1);
    $latTo = deg2rad($lat2);
    $lonTo = deg2rad($lon2);
  
    $latDelta = $latTo - $latFrom;
    $lonDelta = $lonTo - $lonFrom;
    
    $earthRadius = 6371

    $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
      cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
    return $angle * $earthRadius;



?>