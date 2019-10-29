<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" 
     href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> 
    <title>Result</title>
</head>
<body>
    <?php
        require_once "index.php";
        session_start();
        
        $result = $_SESSION['result'];
        echo "Found: " . $result["response"]["numFound"] ."<br><br>";
        foreach($result["response"]["docs"] as $data){
        	echo "Text: " . $data["text"][0] . "<br>";
        	echo "Author: " . $data["author"][0]. "<br>";
        	echo "<br>";
        }
        
    ?>
    <ul class="pagination">
        <?php 
            if (isset($_GET["page"])) {  
                $pn  = $_GET["page"];  
            }  
            else {  
                $pn=1;  
            }; 
            $limit = 10;
            $start_from = ($pn-1) * $limit;
            $total_pages = ceil($result["response"]["numFound"]/ $limit);
            $pagLink = "";
            for ($i=1; $i<=$total_pages; $i++) { 
                if ($i==$pn) { 
                    $pagLink .= "<li class='active'><a href='index.php?page="
                                                    .$i."'>".$i."</a></li>"; 
                }             
                else  { 
                    $pagLink .= "<li><a href='index.php?page=".$i."'> 
                                                    ".$i."</a></li>";   
                } 
            };   
            
            echo $pagLink;
        ?>
    </ul>
    
</body>
</html>