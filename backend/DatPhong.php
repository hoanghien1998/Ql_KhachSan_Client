<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
$conn = mysqli_connect("localhost","root","","qlkhachsan");
  
$datenhan = date_create($_POST["datenhan"]);
$datetra = date_create($_POST["datetra"]);
$slphong = $_POST["slphong"];
$songuoilon = $_POST["songuoilon"];
$sotre = $_POST["sotre"];
$hoten = $_POST["hoten"];
$email = $_POST["email"];
$diachi = $_POST["diachi"];
$sdt = $_POST["sdt"];
$cmnd = $_POST["cmnd"];
$tong = $_POST["tong"];
$id = $_POST["id"];
$price = $_POST["price"];

$ngaynhan = date_format($datenhan, "Y-m-d");
$ngaytra = date_format($datetra, "Y-m-d");
$kiemtra = !empty($datenhan) && !empty($datetra) && !empty($slphong) && !empty($songuoilon) && !empty($hoten) && !empty($email) && !empty($diachi) && !empty($sdt) && !empty($cmnd);

    if ($kiemtra == true)
     {
            // $username = mysqli_real_escape_string($conn, trim($a));
            // $useremail = mysqli_real_escape_string($conn, trim($b));

         // luu du lieu xuong bang customer
            $sql1 = "Insert into customer(name, phone, address, cmnd, email) 
                        values('$hoten','$sdt','$diachi', '$cmnd', '$email')";
            mysqli_query($conn, $sql1);

         // luu du lieu xuong bang bookroom
            $lastID = mysqli_insert_id($conn);
            $sql2 = "Insert into bookroom(cus_code,received_date,pay_date,total,number_adults, number_children) 
                        values ($lastID,'{$ngaynhan}','{$ngaytra}', $tong,$songuoilon, $sotre)";
            mysqli_query($conn, $sql2);

        // luu du lieu xuong bang detailbook
            $lastID2 = mysqli_insert_id($conn);
            $sql3 = "INSERT INTO detailbook(booking_code, room_code, price, number_room, date_set)
                        values ($lastID2,$id, $price, $slphong, CURDATE())";
            mysqli_query($conn, $sql3);

            mysqli_close($conn);               
            echo "You have successfully booked the room!!!! We will contact you soonest";
        
    }
    else
    {
          echo "You must enter full information for us to contact";
    }
?>

