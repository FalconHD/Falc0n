<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

session_start();

//TODO auto load all classes in same place :

function load($className)
{
    if ($className && file_exists('../backend/config/' . $className . '.php')) {
        require_once 'config/' . $className . '.php';
    } else if ($className && file_exists('../backend/helpers/' . $className . '.php')) {
        require_once 'helpers/' . $className . '.php';
    } else if ($className && file_exists('../backend/models/' . $className . '.php')) {
        require_once '../backend/models/' . $className . '.php';
    } else {
        require_once 'router/' . $className . '.php';
    }

}


spl_autoload_register("load");
