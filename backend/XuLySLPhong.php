<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $conn = mysqli_connect("localhost","root","","qlkhachsan");

    $getSL =mysqli_query($conn,"SELECT roomtype.id,roomtype.name,COUNT(room.id)as count_room 
                                        FROM room,roomtype 
                                        WHERE room.typeCode=roomtype.id and state='0' 
                                        GROUP BY room.typeCode");
    // Trả về số hàng trong tập hợp  kết quả --- mysql_num_rows
    if(mysqli_num_rows($getSL) > 0){

        // Trả về tất cả các kết quả của truy vấn dưới dạng mạng
        $sl = mysqli_fetch_all($getSL, MYSQLI_ASSOC);

        echo json_encode(["success"=>1,"slrooms"=>$sl]);
    }
    else{
        echo json_encode(["success"=>0]);
    }
