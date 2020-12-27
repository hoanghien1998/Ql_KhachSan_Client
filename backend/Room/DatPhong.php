<?php
include_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../classes/JwtHandler.php';
$conn = mysqli_connect("localhost","root","","qlkhachsan");
 $rooms = json_decode($_POST["rooms"]);
 $token = $_POST["token"];
// $cart = json_decode($cart,true);
// $method = $_SERVER['REQUEST_METHOD'];
//$data = json_decode(file_get_contents("php://input"));
//order rooms
$jwt = new JwtHandler();
$auth = $jwt->_jwt_decode_data($token);
$user_id = $auth['data']->user_id;
$total =0;
$sql_book_room = "INSERT INTO bookroom (cus_code, total)
VALUES ($user_id, $total)";
if ($conn->query($sql_book_room) === TRUE) {
    echo "Tao thanh cong bookroom";
} else {
    echo "That bai bookroom" . $conn->error;
}
$booking_code = mysqli_insert_id($conn);
//insert

foreach ($rooms as $room){
    $datenhan =date("Y-m-d",strtotime($room->datenhan));
    $datetra =date("Y-m-d",strtotime($room->datetra));

    $sql_detail_book ="INSERT INTO detailbook (booking_code, room_code,price, number_room, number_adults,number_childrens,check_in,check_out,date_set) 
VALUES ($booking_code, $room->choseID,$room->item_price,$room->slphong,$room->songuoilon,$room->sotre,'$datenhan','$datetra',CURDATE())";
    if ($conn->query($sql_detail_book) === TRUE) {
        echo "Tao thanh cong detailbook";
    } else {
        echo "That bai detailbook" . $conn->error;
    }
    $songay= date_diff(date_create($datetra),date_create($datenhan));
    $total += (int)$room->slphong*(int)$room->item_price*((int)$songay->format('%a')+1);
}
$sql = "UPDATE bookroom SET total=$total WHERE id=$booking_code";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}
$conn->close();
die();
// $datenhan = date_create($_POST["datenhan"]);
// $datetra = date_create($_POST["datetra"]);
// $slphong = $_POST["slphong"];
// $songuoilon = $_POST["songuoilon"];
// $sotre = $_POST["sotre"];
// $hoten = $_POST["hoten"];
// $email = $_POST["email"];
// $diachi = $_POST["diachi"];
// $sdt = $_POST["sdt"];
// $cmnd = $_POST["cmnd"];
// $tong = $_POST["tong"];
// $id = $_POST["id"];
// $price = $_POST["price"];

// $ngaynhan = date_format($datenhan, "Y-m-d");
// $ngaytra = date_format($datetra, "Y-m-d");
// $kiemtra = !empty($datenhan) && !empty($datetra) && !empty($slphong) && !empty($songuoilon) && !empty($hoten) && !empty($email) && !empty($diachi) && !empty($sdt) && !empty($cmnd);

//     if ($kiemtra == true)
//      {
//             // $username = mysqli_real_escape_string($conn, trim($a));
//             // $useremail = mysqli_real_escape_string($conn, trim($b));

//          // luu du lieu xuong bang customer
//             $sql1 = "Insert into customer(name, phone, address, cmnd, email) 
//                         values('$hoten','$sdt','$diachi', '$cmnd', '$email')";
//             mysqli_query($db_conn, $sql1);

//          // luu du lieu xuong bang bookroom
//             $lastID = mysqli_insert_id($db_conn);
//             $sql2 = "Insert into bookroom(cus_code,received_date,pay_date,total,number_adults, number_children) 
//                         values ($lastID,'{$ngaynhan}','{$ngaytra}', $tong,$songuoilon, $sotre)";
//             mysqli_query($db_conn, $sql2);

//         // luu du lieu xuong bang detailbook
//             $lastID2 = mysqli_insert_id($db_conn);
//             $sql3 = "INSERT INTO detailbook(booking_code, room_code, price, number_room, date_set)
//                         values ($lastID2,$id, $price, $slphong, CURDATE())";
//             mysqli_query($db_conn, $sql3);

//             mysqli_close($db_conn);
//             echo "You have successfully booked the room!!!! We will contact you soonest";
        
//     }
//     else
//     {
//           echo "You must enter full information for us to contact";
//     }
