<?php

class Auth extends Controller
{

    public function __construct()
    {
        $this->AuthModel = $this->model('AuthModel');
        $this->userModel = $this->model('UserModel');
        $this->validator = $this->middleware();
        // $this->notifModel = $this->model('notifModel');
    }

    public function login()
    {

        // TODO  :  schema validation
        $rules = [
            'email' => 'required|email',
            'password' => 'required|min:0',
        ];
        try {
            $response = $this->validator->validate($this->data, $rules);
            if ($response->error) {
                die(print_r(json_encode($response)));
            }
        } catch (\Exception$th) {
            die(print_r($th->getMessage()));
            // exit(throw $th);
        }

        // TODO  :  Login The User
        $this->data = json_decode($this->data);
        $user = $this->userModel->getUserByEmail($this->data->email);
        if ($user) {
            if (password_verify($this->data->password, $user->password)) {
                $token = $this->getToken($user->id, $user->role);
                $refrechToken = $this->getRefrechToken($user->id, $user->role, $user->password);
                unset($user->password);

                // !TODO : Store the Refrech Token in DB
                $this->AuthModel->add($refrechToken, $user->id);
                print_r(json_encode(array(
                    'User' => $user,
                    'Token' => $token,
                )));
            } else {
                $res = json_encode(array(
                    'error' => 'password incorrect',
                ));
                print_r($res);
            }
        } else {
            $res = json_encode(array(
                'error' => 'email incorrect',
            ));
            print_r($res);
        }
    }

    public function register()
    {
        try {
            $this->data->password = password_hash($this->data->password, PASSWORD_DEFAULT);
            $user = $this->userModel->register($this->data);
            $token = $this->auth($user->id, $user->role, $user->password);
            unset($user->password);
            print_r(json_encode(array(
                'User' => $user,
                'Token' => $token,
            )));
        } catch (\PDOExeption$err) {
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
