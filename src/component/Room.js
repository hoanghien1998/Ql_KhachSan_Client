import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import { Calendar } from "primereact/calendar";
import { Card, Button, Modal } from "react-bootstrap";
import NumberFormat from 'react-number-format';
import "../common/costume.css";
import Slider from "./Slider";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
window.$ = $;

// ham convert ngay thang nam
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

//  Ham lay ra ngay thang nam tien hanh so sanh
const getDayHT = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yy = today.getFullYear();
  return `${yy}-${mm}-${dd}`;
};

const Room = (props) => {
  const history = useHistory();
  // console.log("props", props);
  const [listRoom, setListRoom] = useState([]);
  const [modalState, setModalState] = useState(false);
  // formState dung de set lai hien thi form cua model
  // const [formState, setFormState] = useState(0);
  const [styleHover, setStyleHover] = useState("");
  const [datenhan, setDatenhan] = useState(null);
  const [datetra, setDatetra] = useState(null);
  const [slphong, setSlphong] = useState(1);
  const [songuoilon, setSonguoilon] = useState(1);
  const [sotre, setSotre] = useState(0);
  const [choseID, setChoseID] = useState("");
  const [nametype, setNametype] = useState("");
  const [item_price, setItem_price] = useState("");
  // so luong phong con loai phong
  const [slPhong, setSlPhong] = useState("");
  const [image, setImage] = useState("");
  const [dientich, setDienTich] = useState("");
  const [huongphong, setHuongPhong] = useState("");
  const [giuong, setGiuong] = useState("");

  // Lấy dữ liệu để hiể thị lên modal đặt phòng
  const getModal = (id, name, price, count_room, image_room,dt,huongP,sGiuong) => {
    modalState === true ? setModalState(false) : setModalState(true);
        setChoseID(id);
        setNametype(name);
        setItem_price(price);
        setImage(image_room);
    // eslint-disable-next-line no-unused-expressions
        setDienTich(dt),
        setHuongPhong(huongP),
        setGiuong(sGiuong),
        setSlPhong(parseInt(count_room, 10));
  };

  // Xử lý khi nhấn nút đặt phòng.
  const handleSubmit = () => {
    if (!props.token) {
      history.push("/login");
      return;
    }

    const newCart = {
      choseID,
      item_price,
      nametype,
      datenhan,
      datetra,
      slphong: parseInt(slphong, 10),
      songuoilon,
      sotre,
      slPhong,
      image
    }
    // console.log("newCart", newCart);

    // Truyền cái cart đến trang homwe, rồi đến trang chủ.
    props.handleAddToCart(newCart);
    alert("Bạn đã thêm phòng vào đơn đặt phòng thành công.");
    setDatenhan(null);
    setDatetra(null);
    setSlphong(1);
    setSonguoilon(1);
    setSotre(0);
    // console.log("props", props.token);
  };

  // Hiển thị danh sách các phòng lên
  const LayDsPhong = () => {
    Axios.get("/doan/Ql_KhachSan_Client/backend/Room/LietKePhong.php")
      .then(({ data }) => {
        if (data.success === 1) {
          setListRoom(data.rooms);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Giống component did mount
  useEffect(() => {
    LayDsPhong();
  }, []);

  // Khi rê chuột đến hình ảnh phòng
  const onHover = (id) => {
    setStyleHover(id);
  };

  const onOut = () => {
    setStyleHover(null);
  };

  // Format ngày nhận
  const handleDateNhan = (e) => {
    // console.log("e", convert(e));
    let d1 = convert(e);
    // Ngay nguoi dung nhap
    let ngNhap = d1.split("-");
    // Ngay hien tai cua he thong
    let ngHt = getDayHT().split("-");

    if (
      parseInt(ngNhap[0], 10) === parseInt(ngHt[0], 10) &&
      parseInt(ngNhap[1], 10) === parseInt(ngHt[1], 10) &&
      parseInt(ngNhap[2], 10) < parseInt(ngHt[2], 10)
    ) {
      $("#err_ngay_dat").show();
      $("#err_ngay_dat").text(
        "Ngày đặt phòng phải lớn hơn hoặc bằng ngày hiện tại!!!"
      );
    } else if (
      parseInt(ngNhap[0], 10) === parseInt(ngHt[0], 10) &&
      parseInt(ngNhap[1], 10) < parseInt(ngHt[1], 10)
    ) {
      $("#err_ngay_dat").show();
      $("#err_ngay_dat").text(
        " Tháng đặt phòng phải lớn hơn hoặc bằng tháng hiện tại!!!"
      );
    } else {
      $("#err_ngay_dat").hide();
      setDatenhan(convert(e));
    }
  };

  // Format ngày trả.
  const handleDateTra = (e) => {
    let d1 = convert(e);
    let ngNhap = d1.split("-");
    let ngNhan = datenhan.split("-");
    console.log(ngNhan);
    console.log(ngNhap);
    if (
      parseInt(ngNhap[0], 10) === parseInt(ngNhan[0], 10) &&
      parseInt(ngNhap[1], 10) === parseInt(ngNhan[1], 10) &&
      parseInt(ngNhap[2], 10) < parseInt(ngNhan[2], 10)
    ) {
      $("#err_ngay_tra").show();
      $("#err_ngay_tra").text(
        "Ngày trả phòng lớn hơn hoặc bằng ngày nhận phòng!!!"
      );
    } else if (
      parseInt(ngNhap[0], 10) === parseInt(ngNhan[0], 10) &&
      parseInt(ngNhap[1], 10) < parseInt(ngNhan[1], 10)
    ) {
      $("#err_ngay_tra").show();
      $("#err_ngay_tra").text(
        "Tháng trả phòng phải lớn hơn hoặc bằng tháng nhận phòng!!!"
      );
    } else {
      $("#err_ngay_tra").hide();
      setDatetra(convert(e));
      // this.setState({
      //   datetra: convert(e),
      // });
    }
  };

  // Get list room to show display
  const handleGetList = (listRoom) => {
    return (
      <>
        {
          listRoom.map((item, index) => (

            <Col md={4} key={index}>
              <Link to={``} >
                <Card
                  onMouseOver={() => onHover(item.id)}
                  onMouseLeave={() => onOut()}
                  className={styleHover === item.id ? "shadowHover" : ""}
                  border={styleHover === item.id ? "primary" : ""}
                  style={{
                    width: "100%",
                    border: "1px solid #bd9d1b",
                    marginTop: "20px",
                    borderRadius: "50px",
                  }}
                  onClick={() =>
                      getModal(
                          item.id,
                          item.name,
                          item.price,
                          item.count_room,
                          item.image,
                          item.dientich,
                          item.huongphong,
                          item.giuong
                      )
                  }
                >
                  <Card.Img
                    variant="top"
                    src={"images/" + item.image}
                    style={{ borderRadius: "50px", height: "300px" }}
                  />
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> VND
                    </Card.Title>
                    <Card.Text style={{ textAlign: "center", fontSize: "18pt" }}>
                      {item.name}
                    </Card.Text>
                    <Card.Text style={{ textAlign: "center", fontSize: "18pt" }}>
                      <Button
                        variant="danger"
                        style={{ borderRadius: "30px", marginTop: "5px" }}
                        onClick={() =>
                          getModal(
                            item.id,
                            item.name,
                            item.price,
                            item.count_room,
                            item.image,
                            item.dientich,
                            item.huongphong,
                            item.giuong
                          )
                        }
                      >
                        Đặt phòng
                </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>


          ))
        }
      </>
    )
  }

  return (
    <div>
      <Slider />
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontFamily: "Playfair Display",
          fontStyle: "italic",
        }}
      >
        Phòng của khách sạn
    </h1>
      <Container>
        <Row>{listRoom && handleGetList(listRoom)}</Row>
      </Container>

      <Modal show={modalState} onHide={() => getModal("")}>
        <Modal.Header closeButton>
          <Modal.Title>Đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Quý khách đang chọn loại {nametype}.</h5>
          <Container>
            <Row>
              <Col md={4}>
                <label>Diện tích: </label> {dientich}
              </Col>
              <Col md={4}>
                <label>Hướng phòng: </label> {huongphong}
              </Col>
              <Col md={4}>
                <label>Số giường: </label> {giuong}
              </Col>
              <Col md={6}>
                <h5>Ngày nhận phòng</h5>
                <Calendar
                  name="datenhan"
                  dateFormat="dd/mm/yy"
                  value={datenhan}
                  // onChange={this.luuNhap}
                  onChange={(e) => handleDateNhan(e.target.value)}
                  showIcon={true}
                />
                <p
                  style={{ color: "red", display: "none" }}
                  id="err_ngay_dat"
                />
              </Col>
              {datenhan && (
                <>
                  <Col md={6}>
                    <h5>Ngày trả phòng</h5>
                    <Calendar
                      name="datetra"
                      dateFormat="dd/mm/yy"
                      value={datetra}
                      onChange={(e) => handleDateTra(e.target.value)}
                      showIcon={true}
                    />
                  </Col>
                  <p
                    style={{ color: "red", display: "none" }}
                    id="err_ngay_tra"
                  />
                </>
              )}
            </Row>

            <Row style={{ marginTop: "30px" }}>
              <Col md={4}>
                <label style={{ marginRight: "5px" }}>Số lượng phòng</label>
                <select
                  onChange={(e) => setSlphong(e.target.value)}
                  value={slphong}
                  name="slphong"
                >
                  {slPhong
                    ? [...Array(slPhong).keys()].map((item) => (
                      <option key={item} value={item + 1}>
                        {" "}
                        {item + 1}{" "}
                      </option>
                    ))
                    : 0}
                </select>
              </Col>
              <Col md={4}>
                <label style={{ marginRight: "5px" }}>Số người lớn</label>
                <select
                  onChange={(e) => setSonguoilon(e.target.value)}
                  value={songuoilon}
                  name="songuoilon"
                >
                  <option value="1"> 1 </option>
                  <option value="2"> 2 </option>
                  <option value="3"> 3 </option>
                  <option value="4"> 4 </option>
                  <option value="5"> 5 </option>
                  <option value="6"> 6 </option>
                </select>
              </Col>
              <Col md={4}>
                <label style={{ marginRight: "5px" }}>Số trẻ em</label>
                <select
                  onChange={(e) => setSotre(e.target.value)}
                  value={sotre}
                  name="sotre"
                >
                  <option value="0"> 0 </option>
                  <option value="1"> 1 </option>
                  <option value="2"> 2 </option>
                  <option value="3"> 3 </option>
                  <option value="4"> 4 </option>
                </select>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => {
            handleSubmit();

            setModalState(false);
          }}>
            Booking Room
        </Button>
          <Button variant="secondary" onClick={() => getModal()}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}

export default Room;