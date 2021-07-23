<?php

header('Access-Control-Allow-Origin: http://127.0.0.1:3000');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../vendor/autoload.php';

class User extends Controller
{

    public $data = [];

    public function __construct()
    {
        $this->userModel = $this->model('UserModel');
        $this->validator=$this->middleware('Middleware');
    }

    public function user($data)
    {
        $headers = apache_request_headers();
        $headers = isset($headers['Authorization']) ? explode(' ', $headers['Authorization']) : null;
        if ($headers) {
            try {
                $this->verifyAuth($headers[1]);
                if ($data == 'Admin' || $data == 'Client') {
                    $user = $this->userModel->getUserByRole($data);
                    unset($user->password);
                    print_r(json_encode($user));
                } else {
                    $user = $this->userModel->getUserById($data);
                    unset($user->password);
                    print_r(json_encode($user));
                }
            } catch (\Throwable $th) {
                print_r(json_encode(array(
                    "error" => "unauthorized",
                )));
            }
        } else {
            print_r(json_encode(array(
                "error" => "unauthorized",
            )));
        }
    }


    public function archive($id)
    {
        $headers = apache_request_headers();
        $headers = isset($headers['Authorization']) ? explode(' ', $headers['Authorization']) : null;
        if ($headers) {
            try {
                $this->verifyAuth($headers[1]);
                if ($id == 'student') {
                    $user = $this->userModel->archiveUser($id);
                    unset($user->password);
                    print_r(json_encode($user));
                }
            } catch (\Throwable $th) {
                print_r(json_encode(array(
                    "error" => "unauthorized",
                )));
            }
        } else {
            print_r(json_encode(array(
                "error" => "unauthorized",
            )));
        }
    }

    public function users()
    {
        $headers = apache_request_headers();
        $headers = isset($headers['Authorization']) ? explode(' ', $headers['Authorization']) : null;
        // die(var_dump($headers));
        if ($headers) {
            try {
                $infos = $this->verifyAuth($headers[1]);
                if ($infos->role == "student") {

                    $users = $this->userModel->getUsers();
                        print_r(json_encode(array(
                            "users" => $users,
                        )));
                } else {
                    print_r(json_encode(array(
                        'error' => "You Don't Have Permition to make this action 💢 ",
                    )));
                    die();
                }
            } catch (\Throwable $th) {
                print_r(json_encode(array(
                    'error' => "Authentication error 1💢 ",
                )));
            }
        } else {
            print_r(json_encode(array(
                'error' => "Authentication error 2💢 ",
            )));
        }
    }

}
