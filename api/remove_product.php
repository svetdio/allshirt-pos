<?php
require_once "../config.php";

$db = new mysqli($database_host, $database_user, $database_password, $database_schema);

$item_id = $_POST['item_id'];

$query = "
    DELETE FROM
        items
    WHERE
        item_id = $item_id
";

if ($db->query($query)) {
    echo json_encode(array("result" => "success"));
} else {
    echo json_encode(array('error' => "Cannot delete product."));
}
