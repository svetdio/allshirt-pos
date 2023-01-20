<?php
require_once "../config.php";

$db = new mysqli($database_host, $database_user, $database_password, $database_schema);

$item_id = $_POST['item_id'];
//echo "<pre>";
//print_r($_POST);

$update_query = "
    UPDATE items SET
";

$item_changes = array();
$item_list_changes = array();
foreach ($_POST as $k => $v) {
    if ($k == "item_id") {
        continue;
    } else if ($k == 'item_qty') {
        $item_list_changes[] = "total_item_qty = '$v'";
    } else if ($k == "discount" || $k == "tax_rate") {
        $item_list_changes[] = "$k = '$v'";
    } else {
        $item_changes[] = "$k = '$v'";
    }
}
//print_r($item_changes);
if (isset($_FILES['item_image'])) {
    $item_img_name = 'img/' . $_FILES["item_image"]["name"];
    $target_file = dirname(__FILE__) . '\\..\\img\\' . $_FILES["item_image"]["name"];
    if (!move_uploaded_file($_FILES["item_image"]["tmp_name"], $target_file)) {
        $resp = array('result' => false, 'error' => 'Error in uploading the image.');
    }
    $item_changes[] = "image = '$item_img_name'";
}

$update_query = $update_query . implode(", ", $item_changes)  . " WHERE item_id = '$item_id'";
//print_r($update_query);

$resp = array('result' => true);

if (count($item_changes) >= 1) {
    if ($db->query($update_query)) {
        if (count($item_list_changes) >= 1) {
            $inventory_upd_query = "UPDATE items_list
                    SET " . implode(", ", $item_list_changes) . "
                    WHERE items_id = $item_id;";

            if (!$db->query($inventory_upd_query)) {
                $resp = array('result' => false, 'error' => 'Error in updating item quantity');
            }
        }
    } else {
        $resp = array('result' => false, 'error' => 'Error in updating the item');
    }
} else {
    if (count($item_list_changes) >= 1) {
        $inventory_upd_query = "UPDATE items_list
                SET " . implode(", ", $item_list_changes) . "
                WHERE items_id = $item_id;";
                
        if (!$db->query($inventory_upd_query)) {
            $resp = array('result' => false, 'error' => 'Error in updating item quantity');
        }
    }
}

echo json_encode($resp);
