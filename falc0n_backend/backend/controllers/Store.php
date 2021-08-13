<?php
require '../vendor/autoload.php';

class Store extends Controller
{
    public function __construct()
    {
        $this->models = $this->model(['StoreModel', 'UserModel']);
        $this->middleware = $this->middleware();
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
        $StoreModel->addStore($store->store_name, $store->owner, $store->url);
        $store = $StoreModel->getStoreByInfo($store->store_name, $store->owner, $store->url);
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
            'app_name' => 'Falc0n.exe App',
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
        $result = $woocommerce->get('products', ["per_page" => 100]);
        print_r(json_encode($result));
    }

    public function getOrders($store_id, $id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($store_id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
        $result = $woocommerce->get('orders', $parameters = ['product' => $id]);
        print_r(json_encode($result));
    }

    public function orderStatus($store_id)
    {
        extract($this->models);
        $this->data = json_decode($this->data);
        $store = $StoreModel->getStoreById($store_id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
        $data = [
            'status' => $this->data->status,
        ];
        $result = $woocommerce->put('orders/' . $this->data->order_id, $data);
        print_r(json_encode($result));

    }

    public function getAllOrders($store_id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($store_id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
        $result = $woocommerce->get('orders', $parameters = ['per_page' => 100]);
        print_r(json_encode($result));
    }

    public function getOrdersByAverage($store_id)
    {
        $average = json_decode($this->data);
        extract($this->models);
        $store = $StoreModel->getStoreById($store_id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);

        $query = [
            'date_min' => $average->start,
            'date_max' => $average->end,
        ];
        $result = $woocommerce->get('reports/sales', $query);
        print_r(json_encode($result));
    }

    public function getOrdersByAverageMin($store_id)
    {
        $average = json_decode($this->data);
        // print_r($average);
        extract($this->models);
        $store = $StoreModel->getStoreById($store_id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);

        $query = [
            'date_min' => $average->start,
        ];
        $result = $woocommerce->get('reports/sales', $query);
        print_r(json_encode($result));
    }

    public function reports($id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
        $result = $woocommerce->get('reports/orders/totals');
        print_r(json_encode($result));
    }

    public function stores()
    {
        extract($this->models);
        $stores = $StoreModel->getStores();
        print_r(json_encode($stores));
    }

    public function customers($id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
        $result = $woocommerce->get('customers', ['per_page' => 100, 'role' => "all"]);
        print_r(json_encode($result));
    }

    public function deleteCustomer($id, $customer_id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
        $result = $woocommerce->delete('customers/' . $customer_id, ['force' => true]);
        print_r(json_encode($result));
    }

    public function deleteProduct($id, $product_id)
    {
        extract($this->models);
        $store = $StoreModel->getStoreById($id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        try {
            $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
            $woocommerce->delete('products/' . $product_id);
        } catch (Throwable $th) {
            print_r(json_encode(["message" => "Deleted 🎈"]));
        }
    }

    public function editProduct($id, $product_id)
    {
        extract($this->models);
        $image = $_FILES['file'];
        $imageUrl = $this->middleware->upload('file');

        $store = $StoreModel->getStoreById($id);
        $options = array(
            'wp_api' => true,
            'version' => 'wc/v3',
            'query_string_auth' => true, // Force Basic Authentication as query string true and using under HTTPS
        );
        print_r($imageUrl);
        $data = [
            "images" => [
                (Object) [
                    "src" => 'http://localhost/falc0n/assets/' . $imageUrl->message,
                ],
            ],
        ];
        try {
            $woocommerce = $this->woocommerce($store->url, $store->consumer_key, $store->consumer_secret, $options);
            $woocommerce->put('products/' . $product_id, $data);
        } catch (Throwable $th) {
            throw $th;
        }
        print_r($imageUrl);
    }

}
