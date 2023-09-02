<?php
$data = file_get_contents("nativeads.json");
header("Content-Type: application/json");
echo $data;
?>