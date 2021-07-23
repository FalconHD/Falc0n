<?php
require '../vendor/autoload.php';

use Automattic\WooCommerce\Client;

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

class Controller
{

    public function woocommerce($url, $consumer_key, $consumer_secret, $options)
    {

        $woocommerce = new Client(
            $url,
            $consumer_key,
            $consumer_secret,
            $options
        );
        return $woocommerce;
    }

    public function middleware()
    {
        return new Middleware();
    }

    public function model($models)
    {
        $init = [];
        foreach ($models as $model) {
            $init_model = new $model();
            $init[$model] = $init_model;
        };
        return $init;

    }

    public function view($url, $data = [])
    {
        if (file_exists('../backend/view/' . $url . '.php')) {
            require_once '../backend/view/' . $url . '.php';
        } else {
            die('View does not exist');
        }
    }

}
