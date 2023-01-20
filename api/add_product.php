<?php
require_once "../config.php";

$db = new mysqli($database_host, $database_user, $database_password, $database_schema);

$item_name = $_POST['item_name'];
$item_desc = $_POST['item_desc'];
$item_price = $_POST['item_price'];
$item_qty = $_POST['item_qty'];
$discount = $_POST['discount'];
$tax_rate = $_POST['tax_rate'];
$item_img_name = 'img/' . $_FILES["item_image"]["name"];

$insert_query = "
INSERT INTO items (item_name, image, item_desc, price)
VALUES ('$item_name', '$item_img_name', '$item_desc', $item_price)";

$resp = "";
if ($db->query($insert_query)) {
    $last_id = $db->insert_id;

    $inventory_query = "INSERT INTO items_list (items_id, total_item_qty, discount, tax_rate)
    VALUES ($last_id, $item_qty, $discount, $tax_rate)";

    if ($db->query($inventory_query)) {
        $target_file = dirname(__FILE__) . '\\..\\img\\' . $_FILES["item_image"]["name"];
        if (move_uploaded_file($_FILES["item_image"]["tmp_name"], $target_file)) {
            $resp = array('result' => true);
        } else {
            $resp = array('result' => false, 'error' => 'Error in uploading the image.');
        }
    } else {
        $resp = array('result' => false, 'error' => 'Error in updating item quantity');
    }
} else {
    $resp = array('result' => false, 'error' => 'Error in saving the item');
}

echo json_encode($resp);
