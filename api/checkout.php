<?php

require_once "../config.php";

$db = new mysqli($database_host, $database_user, $database_password, $database_schema);

$cart_data = $_POST['cart'];
$emp_id = $_POST['emp_id'];
$paid_amt = $_POST['paid_amt'];

$isSuccess = true;
$php_errormsg = "";

// Checks if the cart has products in it, else return an error message
if (count($cart_data)) {
    // Create a order record first in the database
    $order_insert = "INSERT INTO orders (emp_id, paid_amt) VALUES ($emp_id, $paid_amt)";

    // On successful order record insert
    // Create the order details from the cart
    if ($db->query($order_insert)) {
        // Get order ID
        $order_id = $db->insert_id;



        // Set the total values for price and qty
        $total_price = 0;
        $total_qty = 0;

        $insert_vals = array();
        $upd_item_vals = array();
        foreach ($cart_data as $cart) {
            // Assigning the cart values to variables
            $item_id = $cart['productId'];
            $price = $cart['price'];
            $qty = $cart['qty'];
            $discount = $cart['discount'];
            $tax_rate = $cart['tax_rate'];
            $item_total_price = $price * $qty;

            // Computing the total values
            $total_qty = $total_qty + $qty;
            $total_price = $total_price + $item_total_price;

            // Setting the values to be inserted in the order details
            $insert_vals[] = "($order_id, $item_id, $qty, $price, $discount, $tax_rate, CURRENT_TIMESTAMP())";

            // Setting the values to be update in the items_list table
            // To change the remaining qty in stock
            $upd_item_vals[] = array('item_id' => $item_id, 'qty' => $qty);
        }

        // Creating the base query for the order details table with the values
        $od_insert = " INSERT INTO orders_detail (order_id, item_id, order_qty, price, discount, tax_rate, transaction_date) 
        VALUES " . implode(", ", $insert_vals);
        
        // Save the order details into the table
        // Then update qtys in the items_list table
        if ($db->query($od_insert)) {
            foreach ($upd_item_vals as $item) {
                $item_id = $item['item_id'];
                $qty = $item['qty'];
                $upd_item_query = "UPDATE items_list SET total_item_qty = (total_item_qty - $qty) WHERE items_id = $item_id";
                if ($db->query($upd_item_query)) {
                } else {
                    $isSuccess = false;
                    $php_errormsg = 'Cannot update item quantities';
                }
            }
        } else {
            $isSuccess = false;
            $php_errormsg = 'Cannot insert order details record';
        }
    } else {
        $isSuccess = false;
        $php_errormsg = 'Cannot create order record';
    }
} else {
    $isSuccess = false;
    $php_errormsg = 'No product in cart';
}


$return = array(
    'success' => $isSuccess
);

if (!$isSuccess) {
    $return['errorMsg'] = $php_errormsg;
}

echo json_encode($return);
