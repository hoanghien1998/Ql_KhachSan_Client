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
if(empty($user_id))
{
    echo "Phien dang nhap ban het han, vui long dang nhap lai";
    return;
}
$total =0;
$sql_book_room = "INSERT INTO bookroom (cus_code, total)
VALUES ($user_id, $total)";
$conn->query($sql_book_room);
$booking_code = mysqli_insert_id($conn);
//insert

foreach ($rooms as $room){
    $datenhan =date("Y-m-d",strtotime($room->datenhan));
    $datetra =date("Y-m-d",strtotime($room->datetra));
    $sql_detail_book ="INSERT INTO detailbook (booking_code, room_type_id,price, number_room, number_adults,number_childrens,check_in,check_out,date_set) 
VALUES ($booking_code, $room->choseID,$room->item_price,$room->slphong,$room->songuoilon,$room->sotre,'$datenhan','$datetra',CURDATE())";
    if ($conn->query($sql_detail_book) === TRUE) {
        echo "detail book thanh cong";
    } else {
        echo "detail book that bai " . $conn->error;
    }
    $songay= date_diff(date_create($datetra),date_create($datenhan));
    $total += (int)$room->slphong*(int)$room->item_price*((int)$songay->format('%a')+1);
    //update state room
    $sql = "UPDATE room SET state ='1' WHERE state='0' AND typeCode=$room->choseID ORDER BY id LIMIT $room->slphong";

    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }

}
$sql = "UPDATE bookroom SET total=$total WHERE id=$booking_code";
$conn->query($sql);
echo "Dat phong thanh cong";
$conn->close();

