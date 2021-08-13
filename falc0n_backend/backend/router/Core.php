<?php



header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Allow-Headers: content-type');
header('Content-Type: application/json');

class Core
{
    protected $Controller = '';
    protected $Method = '';
    protected $params = '';
    protected $Data = [];

    public function __construct()
    {
        $url = $this->getUrl();

        if ($url && file_exists('../backend/controllers/' . ucwords($url[0]) . '.php') ? file_exists('../backend/controllers/' . ucwords($url[0]) . '.php') : die(json_encode(array("error" => "i think your are lost")))) {
            $this->Controller = ucwords($url[0]);
            unset($url[0]);
        }

        require_once '../backend/controllers/' . $this->Controller . '.php';
        $this->Controller = new $this->Controller;

        if (isset($url[1])) {
            if (method_exists($this->Controller, $url[1])) {
                $this->Method = $url[1];
                unset($url[1]);
            }
        }

        $this->Controller->data = file_get_contents("php://input") ? file_get_contents("php://input") : [];
        $this->params = $url ? array_values($url) : [];

        call_user_func_array([$this->Controller, $this->Method], $this->params);

    }

    public function getUrl()
    {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
    }
}
