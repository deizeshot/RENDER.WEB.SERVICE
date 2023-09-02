<?php
// Получаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);
// Преобразуем данные в формат JSON
$json_data = json_encode($data, JSON_PRETTY_PRINT);
// Сохраняем данные в файл
if (file_put_contents("nativeads.json", $json_data) !== false) {
    echo "Data saved successfully";
} else {
    echo "Failed to save data";
}
?>