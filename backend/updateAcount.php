<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db_conn = mysqli_connect("localhost","root","","qlkhachsan");
var_dump($_POST['id']);
$id = $_POST["id"];
$name = $_POST["name"];
$phone = $_POST["phone"];
$address = $_POST["address"];
$cmnd = $_POST["cmnd"];
echo $_POST["id"];
die();
$update_user = "UPDATE customer SET `name` ='$name', `phone` = '$phone', `address` = '$address', `cmnd` = '$cmnd' WHERE `cus_code` = $id";
echo $update_user;
$conn->query($update_user);
echo "Bạn đã cập nhật thông tin thành công";
$conn->close();