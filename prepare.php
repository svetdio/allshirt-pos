<?php

require_once "config.php";

$db = new mysqli($database_host, $database_user, $database_password);

$master_query = file_get_contents("prepare.sql");

if ($db->multi_query($master_query)) {
    do {
        // Store first result set
        if ($result = $db->store_result()) {
            while ($row = $result->fetch_row()) {
                printf("%s\n", $row[0]);
            }
            $result->free_result();
        }
        // if there are more result-sets, the print a divider
        if ($db->more_results()) {
            printf("-------------\n");
        }
        //Prepare next result set
    } while ($db->next_result());
}

