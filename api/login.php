<?php
session_start();
require_once "../config.php";

$db = new mysqli($database_host, $database_user, $database_password, $database_schema);

$emp_username = $_POST['uname'];
$emp_password = $_POST['pass'];

$query = "
    SELECT 
        * 
    FROM employee 
    WHERE
    emp_username = '$emp_username'
";

$stmt = $db->query($query);
$employee = $stmt->fetch_assoc(); // fetch data   

if (is_array($employee) && count($employee) > 0) {
    if ($employee['emp_password'] == $emp_password) {
        $_SESSION['login_details'] = $employee;
        echo json_encode($employee);
    } else {
        echo json_encode(array('error' => "Incorrect Username or Password"));
    }
} else {
    echo json_encode(array('error' => "Username does not exist"));
}
