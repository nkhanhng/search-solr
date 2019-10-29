<?php
ini_set('display_errors', 1);
session_start();

class HttpRequest
{
    private $curl;
    private $offset = 10;

    public function __construct()
    {
        $this->curl = curl_init();
        curl_setopt_array($this->curl, array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
                "content-type: application/json"
            ),
        ));

    }

    public function setOffSet($num){
        $this->offset = $num;
    }
    
    //Set the person's date of birth.
    public function setDateOfBirth($dateOfBirth){
        $this->dateOfBirth = $dateOfBirth;
    }
    
    //Get the person's name.
    public function getName(){
        return $this->name;
    }

    public function setUrl($url)
    {
        curl_setopt_array($this->curl, array(
            CURLOPT_URL => $url,
        ));
    }

    public function setMethod($method)
    {
        curl_setopt_array($this->curl, array(
            CURLOPT_CUSTOMREQUEST => $method
        ));
    }

    public function setData($data)
    {
        curl_setopt_array($this->curl, array(
            CURLOPT_POSTFIELDS => \json_encode([
                'query' => "text:{$data}",
            ])
        ));
    }

    public function setPaginate()
    {
        
    }

    public function execute()
    {
        $response = curl_exec($this->curl);
        $err = curl_error($this->curl);

        curl_close($this->curl);

        if ($err) {
            throw new \Exception ("cURL Error #:" . $err);
        } else {
            return \json_decode($response,true);
        }
    }
}


$httpRequest = new HttpRequest();
$httpRequest->setUrl("http://localhost:8983/solr/quotes/select");
$httpRequest->setMethod("POST");
$httpRequest->setData($_POST['search']);
$dataResponse = $httpRequest->execute();
$_SESSION['result'] = $dataResponse;
// echo "Found: " . $dataResponse["response"]["numFound"] ."<br><br>";
// foreach($dataResponse["response"]["docs"] as $data){
// 	echo "Text: " . $data["text"][0] . "<br>";
// 	echo "Author: " . $data["author"][0]. "<br>";
// 	echo "<br>";
// }
header('Location: result.php');

