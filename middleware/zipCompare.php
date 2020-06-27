<?php
    $query = "https://www.zipcodeapi.com/rest/Z7XXXSNdddvFoqVgXVYpd8WuktqzPbWcEdfxrQcvmjjMZGKNSar1L0NBwSUn9Bq5/distance.json/$zipcode1/$zipcode2/miles";
    $data = file_get_contents($query);
    return $data[12] . $data[13] . $data[14] . $data[15] . $data[16]
?>