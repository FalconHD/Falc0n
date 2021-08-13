<?php

class Auth extends Controller
{

    public function __construct()
    {
        $this->models = $this->model(['AuthModel', 'UserModel']);
        $this->middleware = $this->middleware();
        // $this->notifModel = $this->model('notifModel');
    }

    public function login()
    {
        extract($this->models);
        $this->data = json_decode($this->data);
        // TODO  :  Login The User
        $user = $UserModel->getUserByEmail($this->data->email);
        if ($user) {
            if (password_verify($this->data->password, $user->password)) {
                $token = $this->middleware->getToken($user->id);
                $refrechToken = $this->middleware->getRefrechToken($user->id);
                unset($user->password);

                // !TODO : Store the Refrech Token in DB
                $AuthModel->add($refrechToken, $user->id);
                print_r(json_encode(array(
                    'User' => $user,
                    'Token' => $token,
                )));
            } else {
                http_response_code(401);
                $res = json_encode(array(
                    'error' => 'password incorrect',
                ));
                print_r($res);}
        } else {
            http_response_code(401);
            $res = json_encode(array(
                'error' => 'email incorrect',
            ));
            print_r($res);

        }
    }

    public function register()
    {

        //TODO : REGISTRETION :
        extract($this->models);
        $this->data = json_decode($this->data);
        try {
            $this->data->password = password_hash($this->data->password, PASSWORD_DEFAULT);
            $user = $UserModel->register($this->data);
            if(!$user){
                die("wahyaaaaaaaaaaa");
            }
            $token = $this->middleware->getToken($user->id);
            $refrechToken = $this->middleware->getRefrechToken($user->id);
            unset($user->password);

            // !TODO : Store the Refrech Token in DB
            $AuthModel->add($refrechToken, $user->id);
            print_r(json_encode(array(
                'User' => $user,
                'Token' => $token,
            )));

        } catch (PDOExeption $err) {
            http_response_code(500);
            print_r(json_encode(array('error' => $err->getMessage())));
            die();
        }

    }

    // public function delete($id){
    //     $this->userModel->delete($id);
    // }

    public function Token($id)
    {
        $headers = apache_request_headers();
        $headers = isset($headers['Authorization']) ? explode(' ', $headers['Authorization']) : null;
        if ($headers) {
            $user = $this->userModel->getUserById($id);
            $UserCounter = "counter_$user->id";
            try {
                $info = $this->verifyAuth($headers[1], $user->role);
                print_r(json_encode(array('message' => 'Authorized', 'role' => $user->role)));

            } catch (\Throwable$th) {
                $refresh = $this->AuthModel->currToken($user->id);
                if ($refresh) {
                    try {
                        $this->verifyAuth($refresh->refreshToken, $user->role);
                        $token = $this->getToken($user->id, $user->role);
                        print_r(json_encode(array(
                            "User" => $user,
                            "newToken" => $token,
                        )));
                    } catch (\Throwable$th) {
                        $this->AuthModel->expiredToken($refresh->id);
                        print_r(json_encode(array(
                            "error" => "expired Session Please Login Again",
                        )));
                    }
                } else {
                    print_r(json_encode(array(
                        "error" => "expired Session Please Login Again no token stored",
                    )));
                }
            }
        } else {
            print_r(json_encode(array(
                "error" => "Login First",
            )));
        }
    }

    public function callback()
    {
        $post_data = $this->data;

        $post_data = json_decode($post_data);

        $user_id = (int) filter_var($post_data->user_id, FILTER_SANITIZE_NUMBER_INT);
        $consumer_key = filter_var($post_data->consumer_key, FILTER_SANITIZE_STRING);
        $consumer_secret = filter_var($post_data->consumer_secret, FILTER_SANITIZE_STRING);

        $insert_user_keys = $this->AuthModel->addkey($user_id, $consumer_key, $consumer_secret);

        if (!$insert_user_keys) {
            http_response_code(500);
            die;
        }
    }
}
