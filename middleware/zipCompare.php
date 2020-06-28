<?php
    $query = "https://www.zipcodeapi.com/rest/Z7XXXSNdddvFoqVgXVYpd8WuktqzPbWcEdfxrQcvmjjMZGKNSar1L0NBwSUn9Bq5/distance.json/$zipcode1/$zipcode2/miles";
    $data = file_get_contents($query);
    $data = json_decode($data, true);
    return $data["distance"];
?>