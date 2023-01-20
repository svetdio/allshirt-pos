<?php

require_once "../config.php";

$db = new mysqli($database_host, $database_user, $database_password, $database_schema);

$mode = $_GET['mode'];
switch ($mode) {
    case "daily":
        $txndate = date('Y-m-d', strtotime($_GET['txndate']));
        $base_group = "WHERE DATE(od.transaction_date) = '$txndate'
        GROUP BY i.item_id";
        break;
    case "weekly":
        $txndates = explode(' - ', $_GET['txndate']);
        $startDate = date('Y-m-d', strtotime($txndates[0]));
        $endDate = date('Y-m-d', strtotime($txndates[1]));
        $base_group = "WHERE DATE(od.transaction_date) BETWEEN '$startDate' AND '$endDate'
        GROUP BY i.item_id";
        break;
    case "monthly":
        $txndates = explode('-', $_GET['txndate']);
        $year = $txndates[0];
        $month = $txndates[1];
        $base_group = "WHERE YEAR(od.transaction_date) = '$year' AND MONTH(od.transaction_date) = '$month'
        GROUP BY i.item_id";
        break;
    case "quarterly":
        $year = $_GET['year'];
        $qtr = $_GET['qtr'];
        switch ($qtr) {
            case "1":
                $startMonth = 1;
                $endMonth = 3;
                break;
            case "2":
                $startMonth = 4;
                $endMonth = 6;
                break;
            case "3":
                $startMonth = 7;
                $endMonth = 9;
                break;
            case "4":
                $startMonth = 10;
                $endMonth = 12;
                break;
        }
        $base_group = "WHERE YEAR(od.transaction_date) = '$year' 
            AND MONTH(od.transaction_date) BETWEEN '$startMonth' AND '$endMonth'
        GROUP BY i.item_id";
        break;
}


$base_query = "SELECT 
        DATE_FORMAT(od.transaction_date, '%m/%d/%Y') transaction_date,
        i.item_id,
        i.item_name,
        i.item_desc,
        od.price,
        od.discount,
        od.tax_rate,
        SUM(od.order_qty) items_sold,
        SUM(od.order_qty * od.price) gross_sales_total,
        SUM((od.price * (od.discount / 100)) * od.order_qty) total_discount,
        SUM(od.price * (od.tax_rate / 100) * od.order_qty) total_tax
    FROM items i
    LEFT JOIN items_list il ON i.item_id = il.items_id
    LEFT JOIN orders_detail od ON od.item_id = i.item_id
    LEFT JOIN orders o ON o.order_id = od.order_id
    LEFT JOIN employee e ON e.emp_id = o.emp_id
    $base_group
";


$query = "SELECT *, gross_sales_total - total_tax - total_discount net_sales FROM (
	$base_query
) base
ORDER BY net_sales DESC";

$stmt = $db->query($query);
$result = array();

while ($v = $stmt->fetch_assoc()) {
    $result[] = $v;
}

echo json_encode($result);
