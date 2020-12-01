<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db_conn = mysqli_connect("localhost","root","","qlkhachsan");

$allrooms = mysqli_query($db_conn,"SELECT room.id, room.image, roomtype.name, roomtype.price FROM room INNER JOIN roomtype ON room.typeCode = roomtype.id");


if(mysqli_num_rows($allrooms) > 0){

    $all_rooms = mysqli_fetch_all($allrooms, MYSQLI_ASSOC);
   
    echo json_encode(["success"=>1,"rooms"=>$all_rooms]);
}
else{
    echo json_encode(["success"=>0]);
}