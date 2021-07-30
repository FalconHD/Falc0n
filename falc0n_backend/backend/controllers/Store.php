<?php
require '../vendor/autoload.php';

class Store extends Controller
{
    public function __construct()
    {
        $this->models = $this->model(['StoreModel', 'UserModel']);
        $this->validator = $this->middleware();
    }

    public function callback()
    {
        extract($this->models);
        $store_keys = json_decode($this->data);

        $id = (int) filter_var($store_keys->user_id, FILTER_SANITIZE_NUMBER_INT);
        $consumer_key = filter_var($store_keys->consumer_key, FILTER_SANITIZE_STRING);
        $consumer_secret = filter_var($store_keys->consumer_secret, FILTER_SANITIZE_STRING);

        $insert_user_keys = $StoreModel->addkey($id, $consumer_key, $consumer_secret);
        if (!$insert_user_keys) {
            http_response_code(500);
            die;
        }
    }

    public function add()
    {
        $store = json_decode($this->data);
        extract($this->models);
        $StoreModel->addStore($store->store_name,$store->owner, $store->url);
        $store = $StoreModel->getStoreByInfo($store->owner, $store->url);
        print_r(json_encode($store));
    }
    public function get($id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($id);
        print_r(json_encode($store));
    }

    public function connect($id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($id);
        $params = array(
            'app_name' => 'Falc0n',
            'scope' => 'read_write', // 'read', 'write', 'read_write'
            'user_id' => $store->id,
            'return_url' => "http://localhost:3005/stores",
            'callback_url' => 'https://localhost/falc0n/store/callback', // Must be https
        );
        $query = http_build_query($params, null, '&', PHP_QUERY_RFC3986);

        print_r(json_encode(array(
            "url" => $store->url . "/wc-auth/v1/authorize" . '?' . $query,
        )));
    }

    public function getProducts($id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
        $result = $woocommerce->get('products');
        print_r(json_encode($result));
    }

    public function stores()
    {
        extract($this->models);
        $stores = $StoreModel->getStores();
        print_r(json_encode($stores));
    }
}
