<?php

require_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;

$dotenv = Dotenv\Dotenv::createImmutable('../');
$dotenv->load();

// ? How to use

/*
TODO availebel_Rules = [required,integer,max:10,min:10,date,email];

$rules = [
'id' => 'required|integer',
'name' => 'required|max:255',
'date' => 'required|date',
'email' =>'required|email'
'password'=> 'required|min:8|max:255'
]

? $response = $middleware->validate($json,$rules) ;

 */

/**
$name = name of file
? $response = $middleware->upload($name) ;

$path = path of file
$response = $middleware->removeUploaded($path) ;

 */

class Middleware
{
    /**
     * The message to be applied to the data.
     *
     * @var array
     */
    protected $attribute = [];

    /**
     * Validate the given request with the given rules.
     *
     * @param  string|JSON  $request
     * @param  array  $rules
     * @return array
     */
    public function validate($request, array $rules = [])
    {

        if (!$this->validateJson($request)) {
            return (object) ["error" => true, "message" => 'Content must be json'];
        }

        $request = json_decode($request, true);

        if (!$this->array_matche(array_keys($request), array_keys($rules))) {
            return (object) ["error" => true, "message" => 'Content is not specified or specified incorrectly.'];
        }

        foreach ($request as $key => $_) {
            $this->attribute[$key] = [];
            foreach ($this->explodeExplicitRule($rules[$key]) as $v) {
                switch ($v) {
                    case 'required':
                        if (!$this->validateRequired($request[$key])) {
                            array_push($this->attribute[$key], [$v => "The $key field is required."]);
                        }
                        break;
                    case 'email':
                        if (!$this->validateEmail($request[$key])) {
                            array_push($this->attribute[$key], [$v => "Please enter a valid email address."]);
                        }
                        break;
                    case 'integer':
                        if (!$this->validateInteger($request[$key])) {
                            array_push($this->attribute[$key], [$v => "The $key must be integer"]);
                        }
                        break;
                    case 'date':
                        if (!$this->validateDate($request[$key])) {
                            array_push($this->attribute[$key], [$v => "The $key is not valid date"]);
                        }
                    case preg_match('/\w+:\d+/', $v) ? true : false:
                        $len = explode(':', $v, 2);

                        $attr = $len[0];
                        $num = $len[1];
                        switch ($attr) {
                            case 'max':
                                if (!$this->validateLen("max", $request[$key], $len[1])) {
                                    array_push($this->attribute[$key], [$attr => "The $key must not be greater than $num characters."]);
                                }
                                break;
                            case 'min':
                                if (!$this->validateLen("min", $request[$key], $len[1])) {
                                    array_push($this->attribute[$key], [$attr => "The $key must be at least $num characters."]);
                                }
                                break;
                        }
                        break;
                }
            }
        }

        return (object) ["error" => !empty(array_filter($this->attribute)), "attribute" => $this->attribute];
    }

    /**
     * Explode the explicit rule into an array if necessary.
     *
     * @param  mixed  $rule
     * @return array<
     */
    public function explodeExplicitRule($rule): array
    {
        return is_string($rule) ? explode('|', $rule) : [];
    }

    /**
     * Validate that an attribute is a valid e-mail address.
     *
     * @param  mixed  $value
     * @return bool
     */
    public function validateEmail($value): bool
    {
        if (is_string($value)) {
            return preg_match("/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,4}/", $value) && filter_var($value, FILTER_VALIDATE_EMAIL);
        }
        return false;
    }

    /**
     * Validate the attribute is a valid JSON string.
     *
     * @param  mixed  $value
     * @return bool
     */
    public function validateJson($value): bool
    {
        if (is_array($value)) {
            return false;
        }

        if (!is_scalar($value) && !is_null($value) && !method_exists($value, '__toString')) {
            return false;
        }

        json_decode($value);

        return json_last_error() === JSON_ERROR_NONE;
    }

    public function array_matche($array, $_array): bool
    {
        return array_diff($array, $_array) == array_diff($_array, $array);
    }

    /**
     * Validate that a required attribute exists.
     *
     * @param  mixed  $value
     * @return bool
     */
    public function validateRequired($value): bool
    {
        if (is_null($value)) {
            return false;
        } elseif (is_string($value) && trim($value) === '') {
            return false;
        } elseif ((is_array($value) || $value instanceof Countable) && count($value) < 1) {
            return false;
        }
        return true;
    }

    /**
     * Validate the size of an attribute is greater than a minimum value.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  int  $len
     * @return bool
     */
    public function validateLen($attribute, $value, $len): bool
    {
        if (strtolower($attribute) === 'max') {
            return strlen(trim($value)) <= $len;
        }
        if (strtolower($attribute) === 'min') {
            return strlen(trim($value)) >= $len;
        }
    }

    /**
     * Validate that an attribute is an integer.
     *
     * @param  mixed  $value
     * @return bool
     */
    public function validateInteger($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_INT) !== false;
    }

    /**
     * Validate that an attribute is a valid date.
     *
     * @param  mixed  $value
     * @return bool
     */
    public function validateDate($value): bool
    {

        if ((!is_string($value) && !is_numeric($value))) {
            return false;
        }

        $date = date_parse($value);
        return checkdate($date['month'], $date['day'], $date['year']);
    }

    /**
     * Store the uploaded file on a filesystem disk.
     *
     * @param  string  $name
     */
    public function upload($name = '')
    {
        $exist = $_FILES[$name] ?? false;

        if ($exist === false) {
            return $this->getInfo(false, "No file sent.");
        }

        $file = (object) $_FILES[$name];

        if ($file->error !== UPLOAD_ERR_OK) {
            return $this->getInfo(false, "UPLOAD_ERR_OK");
        }

        if ($file->size > 5306537) {
            return $this->getInfo(false, "Exceeded filesize limit.");
        }

        $allow = $this->validateType($this->extension($file->name));

        if ($allow === false) {
            return $this->getInfo(false, "Type of files are not allowed.");
        }

        $nm = $this->hashName() . $this->extension($file->name);
        $dir = dirname(BASE) . '/public/assets/' . $nm;

        if (move_uploaded_file($file->tmp_name, $dir)) {
            return $this->getInfo(true, $nm);
        } else {
            return $this->getInfo(false, "Failed to move uploaded file.");
        }
    }

    /**
     * Store the uploaded file on a filesystem disk.
     *
     * @param  string  $path
     */
    public function removeUploaded($path = null)
    {
        $dir = __DIR__ . '/storage/' . $path;
        if (unlink($dir)) {
            return $this->getInfo(true, "Removed.");
        } else {
            return $this->getInfo(false, "something went wrong!");
        }
    }

    /**
     * Get a filename for the file.
     *
     * @return string
     */
    public function hashName()
    {
        return time() . '.' . uniqid() . '.';
    }

    /**
     * Get the file's extension.
     * @param  string  $name
     * @return string
     */
    public function extension($name): string
    {
        $ext = strtolower(explode('.', $name)[1]);
        return $ext ?? "";
    }

    /**
     * Validate the MIME type of a file is an image MIME type.
     *
     * @param  mixed  $value
     * @return bool
     */
    public function validateType($value): bool
    {
        return in_array($value, ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']);
    }

    public function getInfo($status, $message)
    {
        return (object) ["status" => $status, "message" => $message];
    }

    public function rateLimit()
    {
        //
    }

//TODO:AUTH Party

    public function getToken($id)
    {
        $iat = time();
        $exp = $iat + 60 * 0.1;
        $payload = array(
            "iss" => "localhost",
            "aud" => "localhost",
            "iat" => $iat,
            'exp' => $exp,
            'id' => $id,
        );
        $jwt = JWT::encode($payload, $_ENV['SECRET_KEY'], 'HS512');

        return $jwt;
    }

    public function getRefrechToken($id)
    {
        $iat = time();
        $exp = $iat + 60 * 0.5;
        $payload = array(
            "iss" => "localhost",
            "aud" => "localhost",
            "iat" => $iat,
            'exp' => $exp,
            'id' => $id,
        );
        $jwt = JWT::encode($payload, $_ENV['SECRET_KEY'], 'HS512');

        return $jwt;
    }

    public function verifyAuth($token, $role = 'student')
    {
        switch ($role) {
            case 'student':
                $decoded = JWT::decode($token, $_ENV['STUDENT_KEY'], array('HS512'));
                break;
            case 'Admin':
                $decoded = JWT::decode($token, $_ENV['ADMIN_KEY'], array('HS512'));
                break;
            case 'staff':
                $decoded = JWT::decode($token, $_ENV['STAF_KEY'], array('HS512'));
                break;
            default:
                $decoded = JWT::decode($token, $_ENV['STUDENT_KEY'], array('HS512'));
                break;
        }
        return $decoded;
    }

}
