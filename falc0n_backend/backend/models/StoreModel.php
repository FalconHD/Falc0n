<?php

class StoreModel
{
    private $db;
    public function __construct()
    {
        $this->db = new Database();
    }

    public function addkey($id, $consumer_key, $consumer_secret)
    {
        try {
            $this->db->query("UPDATE
                store
            SET
                consumer_key=:consumer_key,
                consumer_secret=:consumer_secret
            WHERE
                id=:id");
            $this->db->bind(':id', $id);
            $this->db->bind(':consumer_key', $consumer_key);
            $this->db->bind(':consumer_secret', $consumer_secret);
            $this->db->single();

        } catch (\PDOExeption$err) {
            return $err->getMessage();
            die();
        }

        return true;
    }

    public function addStore($store_name,$owner, $url)
    {
        try {
            $this->db->query("INSERT INTO
                store
            SET
                owner=:owner,
                url=:url,
                store_name=:store_name
                ");
            $this->db->bind(':owner', $owner);
            $this->db->bind(':url', $url);
            $this->db->bind(':store_name', $store_name);
            $this->db->single();
        } catch (\PDOExeption$err) {
            return $err->getMessage();
            die();
        }

        return true;
    }

    public function getStoreByInfo($store_name,$owner, $url)
    {
        try {
            $this->db->query("SELECT * FROM store WHERE url=:url AND owner=:owner AND store_name=:store_name");
            $this->db->bind(':owner', $owner);
            $this->db->bind(':url', $url);
            $this->db->bind(':store_name', $store_name);
            return $this->db->single();

        } catch (\PDOExeption$err) {
            return $err->getMessage();
            die();
        }

        return true;
    }

    public function getStoreById($id)
    {

        try {
            $this->db->query("SELECT * FROM store WHERE id=:id");
            $this->db->bind(':id', $id);
            return $this->db->single();

        } catch (\PDOExeption$err) {
            return $err->getMessage();
            die();
        }

        return true;
    }

    public function getStores()
    {

        try {
            $this->db->query("SELECT * FROM store");
            return $this->db->all();

        } catch (\PDOExeption$err) {
            return $err->getMessage();
            die();
        }

        return true;
    }

}
