<?php

class UserModel
{
  

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getUsers()
    {
        $this->db->query("SELECT * FROM members");
        return $this->db->all();
    }

    public function getUserById($id)
    {
        $this->db->query("SELECT * FROM members WHERE id = :id");
        $this->db->bind(':id', $id);
        return $this->db->single();
    }

    public function getUserByEmail($email)
    {
        $this->db->query("SELECT * FROM members WHERE email = :email");
        $this->db->bind(':email', $email);
        return $this->db->single();
    }

    public function getEmailById($id)
    {
        $this->db->query("SELECT email FROM members WHERE id = :id");
        $this->db->bind(':id', $id);
        return $this->db->single();
    }


    public function getUserByRole($role)
    {
        echo $role;
        $this->db->query("SELECT * FROM user WHERE role = :role");
        $this->db->bind(':role', $role);
        return $this->db->all();
    }
    public function archiveUser($id)
    {
        echo $role;
        $this->db->query("UPDATE `members` SET `archived`='1' WHERE id=:id");
        $this->db->bind(':id', $id);
        return $this->db->all();
    }

    public function register($data)
    {

        try {
            $this->db->query("INSERT INTO
                members
            SET
                first_name = :first_name,
                cin = :cin,
                last_name = :last_name,
                phone = :phone,
                email = :email,
                password = :password,
                birth_date = :birth_date
            ");
            $this->db->bind(':first_name', $data->first_name);
            $this->db->bind(':last_name', $data->last_name);
            $this->db->bind(':phone', $data->phone);
            $this->db->bind(':cin', $data->cin);
            $this->db->bind(':email', $data->email);
            $this->db->bind(':password', $data->password);
            $this->db->bind(':birth_date', $data->birth_date);
            $this->db->single();
        } catch (\PDOExeption $err) {
            return $err->getMessage();
            die();
        }
        return $this->getUserById($data->cin);
    }


    
   
}
