import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import Axios from 'axios';
function Detail_Book(props) {
    // Define state in function
    const [IDRoom, setIDRoom] = useState("");
    const [DateNhan, setDateNhan] = useState(null);
    const [DateTra, setDateTra] = useState(null);
    const [price, setPrice] = useState("");
    const [NameRoomType, setNameRoomType] = useState("");
    const [RoomNumber, setRoomNumber] = useState(1);
    const [AdultNumber, setAdultNumber] = useState(1);
    const [ChildNumber, setChildNumber] = useState(0);
    const [Total, setTotal] = useState(0);

    const { rooms, token } = props;
     // console.log("rooms", rooms);


    const handleTinhNgay = (datenhan, datetra) => {
        const d1 = new Date(datenhan).getTime();
        const d2 = new Date(datetra).getTime();
        var daysTill30June2035 = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
        // console.log("daysTill30June2035", daysTill30June2035 + 1);
        return daysTill30June2035 + 1;
    };

    const handleShowDate = (item) => {
        const data = item.split('-');
        return `${data[2]}-${data[1]}-${data[0]}`
    }

    const handleSendCart = () => {
        var frm = new FormData();
        frm.append("rooms",JSON.stringify(rooms));
        frm.append("token",token);
        var url = "/doan/Ql_KhachSan_Client/backend/Room/DatPhong.php";
        Axios.post(url, frm).then(res => {
            console.log("res", res)

        })
            .catch(err => console.log(err));
        // fetch("http://localhost:8081/doan/Ql_KhachSan_Client/backend/Room/DatPhong.php", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'token':token
        //     },
        //     body: JSON.stringify({
        //         rooms
        //     })
        // })
        //     .then((res) => res.json())
        //     .then((res) => console.log(res))
        //     .catch(err => console.log(err));

    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={12}>
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "20pt",
                                fontFamily: "Poppins",
                                marginTop: "20px",
                            }}
                        ></div>
                        <table
                            border="1px soild #bd9d1b"
                            style={{ margin: "20px auto" }}
                            width="100%"
                        >
                            <thead>
                                <tr style={{ textAlign: "center", fontSize: "18pt" }}>
                                    <th>Loại phòng</th>
                                    <th>Hình ảnh</th>
                                    <th>Ngày nhận</th>
                                    <th>Ngày Trả</th>
                                    <th>Số lượng người ở</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Tổng tiền</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms &&
                                    rooms.map((item, index) => (
                                        <tr key={index} style={{ textAlign: "center" }}>
                                            <td style={{ fontSize: "16pt" }}>{item.nametype}</td>
                                            <td><img src={"images/" + item.image} height="150px" width="150px" alt="" /></td>
                                            <td style={{ fontSize: "16pt" }}>
                                                {handleShowDate(item.datenhan)}
                                            </td>
                                            <td style={{ fontSize: "16pt" }}>
                                                {handleShowDate(item.datetra)}
                                            </td>
                                            <td style={{ fontSize: "16pt" }}>
                                                <label>Số người lớn:</label> {item.songuoilon}
                                                <label>Số trẻ em:</label> {item.sotre}
                                            </td>
                                            <td>
                                                {/* handleMinustQtyRoom */}
                                                <button
                                                    onClick={() => props.handleMinustQtyRoom(item)}
                                                    style={{ marginRight: "10px" }}
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                {item.slphong}
                                                <button
                                                    onClick={() => props.handlePlustQtyRoom(item)}
                                                    style={{ marginLeft: "10px" }}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </td>
                                            {/* <td>{handleTinhNgay(item.datenhan, item.datetra)}</td> */}
                                            <td>{item.item_price}</td>
                                            <td>
                                                {handleTinhNgay(item.datenhan, item.datetra) *
                                                    parseInt(item.item_price, 10) *
                                                    item.slphong}
                                            </td>
                                            {/* handleDeleteRoom */}

                                            <td>
                                                <button
                                                    onClick={() => props.handleDeleteRoom(item.choseID)}
                                                >
                                                    X
                        </button>
                                            </td>
                                        </tr>
                                    ))}
                                <tr>
                                    <th style={{ textAlign: "center", fontSize: "20pt" }}>
                                        Tổng:{" "}

                                    </th>
                                    <th style={{ textAlign: "center", fontSize: "20pt" }}>
                                        {rooms &&
                                            rooms.reduce(
                                                (a, c) =>
                                                    a +
                                                    handleTinhNgay(c.datenhan, c.datetra) *
                                                    c.slphong *
                                                    c.item_price,
                                                0
                                            )}
                                        $<input type="hidden" name="tong" value="" />
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            style={{ marginLeft: "300px", marginTop: "50px" }}
                            onClick={() => handleSendCart()}
                        >
                            ORDER
            </Button>
                        <Button
                            variant="primary"
                            style={{ marginLeft: "300px", marginTop: "50px" }}
                        >
                            CANCEL CART
            </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Detail_Book;
