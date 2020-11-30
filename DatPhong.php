<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
$conn = mysqli_connect("localhost","root","","qlkhachsan");
  
$datenhan = $_POST["datenhan"];
$datetra = $_POST["datetra"];
$slphong = $_POST["slphong"];
$songuoilon = $_POST["songuoilon"];
$sotre = $_POST["sotre"];
$hoten = $_POST["hoten"];
$email = $_POST["email"];
$diachi = $_POST["diachi"];
$sdt = $_POST["sdt"];
$cmnd = $_POST["cmnd"];
$tong = $_POST["tong"];

$kiemtra = !empty($datenhan) && !empty($datetra) && !empty($slphong) && !empty($songuoilon) && !empty($hoten) && !empty($email) && !empty($diachi) && !empty($sdt) && !empty($cmnd);

    if ($kiemtra == true)
     {
            // $username = mysqli_real_escape_string($conn, trim($a));
            // $useremail = mysqli_real_escape_string($conn, trim($b));

            $sql1 = "Insert into customer(name, phone, address, cmnd, email) values('$hoten','$sdt','$diachi', '$cmnd', '$email')"; 
            mysqli_query($conn, $sql1);

            $lastID = mysqli_insert_id($conn);
            $sql2 = "Insert into bookroom(cus_code,received_date,pay_date,total,number_adults, number_children) values ($lastID,$datenhan,$datetra, $tong,$songuoilon, $sotre)";
            mysqli_query($conn, $sql2);

            mysqli_close($conn);               
            echo "You have successfully booked the room!!!! We will contact you soonest";
        
    }
    else
    {
          echo "You must enter full information for us to contact";
    }
?>