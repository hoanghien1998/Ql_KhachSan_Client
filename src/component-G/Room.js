import React, { Component } from "react";
import Axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import { Calendar } from 'primereact/calendar';
import { Card, Button, Modal } from "react-bootstrap";
import "../common/costume.css";
import Slider from "./Slider";
import $ from 'jquery';
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
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yy = today.getFullYear();
  return `${yy}-${mm}-${dd}`;
}

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [],
      modalState: false,
      styleHover: "",
      datenhan: null,
      datetra: null,
      slphong: 1,
      songuoilon: 1,
      sotre: 0,
      choseID: '',
      nametype: '',
      item_price: '',
      slPhong: '',
      tong: 0,
      soluong: 1
    };
    this.handleSubmit = this.handleSubmit.bind()
  }



  luuNhap = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.value.toLocaleDateString() )
  }

  // show modal for client booking room;
  getModal(id, name, price, count_room) {
    if (this.state.modalState === true) {
      this.setState({ formState: 0 });
    }
    this.state.modalState === true ? this.setState({ modalState: false }) : this.setState({ modalState: true });
    this.setState({ choseID: id, nametype: name, item_price: price, slPhong: parseInt(count_room, 10) })
    // console.log(id, name, count_room)
  }

  Hoantatdatphong = (tb) => {
    alert(tb);
    this.setState({
      datenhan: null, datetra: null, slphong: 1, songuoilon: 1, sotre: 0, hoten: '',
      email: '', diachi: '', sdt: '', cmnd: '', modalState: false
    });
  }

  handleSubmit = () => {
    if (!this.props.props.token) {
      this.props.props.history.replace(`/login`);
      return
    }
    // const {datenhan} = this.state;
    //console.log("state",this.state) ---> kiem tra state co nhung ttin gi
    // console.log("datenhan", typeof datenhan) ---> để kiểm tra xem ngày lưu xuống dạng gì
    let frmdata = new FormData();
    frmdata.append("datenhan", this.state.datenhan);
    frmdata.append("datetra", this.state.datetra);
    frmdata.append("slphong", this.state.slphong);
    frmdata.append("songuoilon", this.state.songuoilon);
    frmdata.append("sotre", this.state.sotre);
    frmdata.append("id", this.state.choseID);
    frmdata.append("price", this.state.item_price);

    const url = "/doan/Ql_KhachSan_Client/backend/Room/DatPhong.php";

    Axios.post(url, frmdata).then(res => this.Hoantatdatphong(res.data)).catch(err => alert(err));
  }

  LayDsPhong = () => {
    Axios.get("/doan/Ql_KhachSan_Client/backend/Room/LietKePhong.php")
      .then(({ data }) => {
        if (data.success === 1) {
          this.setState({
            listRoom: data.rooms,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.LayDsPhong();

  }

  onHover = (id) => {
    this.setState({ styleHover: id });
  };
  onOut = () => {
    this.setState({ styleHover: null });
  };

  handleDateNhan = (e) => {
    console.log("e", convert(e));
    let d1 = convert(e);
    // Ngay nguoi dung nhap
    let ngNhap = d1.split('-');
    // Ngay hien tai cua he thong
    let ngHt = getDayHT().split('-');

    if (parseInt(ngNhap[0], 10) === parseInt(ngHt[0], 10)
      && parseInt(ngNhap[1], 10) === parseInt(ngHt[1], 10)
      && parseInt(ngNhap[2], 10) < parseInt(ngHt[2], 10)) {
      $("#err_ngay_dat").show();
      $("#err_ngay_dat").text("Ngày đặt phòng phải lớn hơn hoặc bằng ngày hiện tại!!!");
    }
    else if (parseInt(ngNhap[0], 10) === parseInt(ngHt[0], 10)
      && parseInt(ngNhap[1], 10) < parseInt(ngHt[1], 10)) {
      $("#err_ngay_dat").show();
      $("#err_ngay_dat").text(" Tháng đặt phòng phải lớn hơn hoặc bằng tháng hiện tại!!!");

    }
    else {
      $("#err_ngay_dat").hide();
      this.setState({
        datenhan: convert(e)
      })
    }
  }
  handleDateTra = (e) => {
    let d1 = convert(e);
    let ngNhap = d1.split('-');
    let ngNhan = this.state.datenhan.split('-');
    console.log(ngNhan);
    console.log(ngNhap);
    if (parseInt(ngNhap[0], 10) === parseInt(ngNhan[0], 10) &&
      parseInt(ngNhap[1], 10) === parseInt(ngNhan[1], 10) &&
      parseInt(ngNhap[2], 10) < parseInt(ngNhan[2], 10)) {
      $("#err_ngay_tra").show();
      $("#err_ngay_tra").text("Ngày trả phòng lớn hơn hoặc bằng ngày nhận phòng!!!");
    } else if (parseInt(ngNhap[0], 10) === parseInt(ngNhan[0], 10) &&
      parseInt(ngNhap[1], 10) < parseInt(ngNhan[1], 10)) {
      $("#err_ngay_tra").show();
      $("#err_ngay_tra").text("Tháng trả phòng phải lớn hơn hoặc bằng tháng nhận phòng!!!");
    } else {
      $("#err_ngay_tra").hide();
      this.setState({
        datetra: convert(e)
      })
    }
  }

  render() {
    let rooms = this.state.listRoom.map((item, index) => {
      return (
        <Col md={4} key={index}>
          <Card
            onMouseOver={() => this.onHover(item.id)}
            onMouseLeave={() => this.onOut()}
            className={this.state.styleHover === item.id ? "shadowHover" : ""}
            border={this.state.styleHover === item.id ? "primary" : ""}
            style={{
              width: "100%",
              border: "1px solid #bd9d1b",
              marginTop: "20px",
              borderRadius: "50px",
            }}
          >
            <Card.Img
              variant="top"
              src={"images/" + item.image}
              style={{ borderRadius: "50px", height: "300px" }}
            />
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                {item.price} VND
              </Card.Title>
              <Card.Text style={{ textAlign: "center", fontSize: "18pt" }}>
                {item.name}
              </Card.Text>
              <Card.Text style={{ textAlign: "center", fontSize: "18pt" }}>
                <Button
                  variant="danger"
                  style={{ borderRadius: "30px", marginTop: "5px" }}
                  onClick={() => this.getModal(item.id, item.name, item.price, item.count_room)}
                >
                  Đặt phòng
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return (

      // style={{backgroundImage:'url(images/hinhnen8.jpg)'}}
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
          Hotel Master's Rooms
        </h1>
        <Container>
          <Row>{rooms}</Row>
        </Container>

        <Modal show={this.state.modalState} onHide={() => this.getModal("")}>
          <Modal.Header closeButton>
            <Modal.Title>Đặt phòng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Quý khách đang chọn loại phòng {this.state.nametype} room.</h5>
            <Container>
              <Row>
                <Col md={6}>
                  <h5>Ngày nhận phòng</h5>
                  <Calendar name="datenhan" dateFormat="dd/mm/yy" value={this.state.datenhan}
                    // onChange={this.luuNhap}
                    onChange={(e) => this.handleDateNhan(e.target.value)}
                    showIcon={true} />
                  <p style={{ color: "red", display: "none" }} id="err_ngay_dat" />
                </Col>
                {
                  this.state.datenhan && (
                    <>
                      <Col md={6}>
                        <h5>Ngày trả phòng</h5>
                        <Calendar name="datetra" dateFormat="dd/mm/yy" value={this.state.datetra}
                          onChange={(e) => this.handleDateTra(e.target.value)}
                          showIcon={true} />
                      </Col>
                      <p style={{ color: "red", display: "none" }} id="err_ngay_tra" />
                    </>

                  )
                }

              </Row>

              <Row style={{ marginTop: "30px" }}>
                <Col md={4}>
                  <label style={{ marginRight: '5px' }}>Số lượng phòng</label>
                  <select
                    onChange={(e) => this.luuNhap(e)}
                    value={this.state.value}
                    name="slphong">
                    {
                      this.state.slPhong ? ([...Array(this.state.slPhong).keys()].map((item) => (
                        <option key={item} value={item + 1}> {item + 1} </option>
                      ))) : 0
                    }

                  </select>
                </Col>
                <Col md={4}>
                  <label style={{ marginRight: '5px' }}>Số người lớn</label>
                  <select onChange={this.luuNhap} value={this.state.value} name="songuoilon">
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                    <option value="6"> 6 </option>

                  </select>
                </Col>
                <Col md={4}>

                  <label style={{ marginRight: '5px' }}>Số trẻ em</label>
                  <select onChange={this.luuNhap} value={this.state.value} name="sotre">
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
            <Button variant="success"
              onClick={this.handleSubmit} >
              Booking Room
              </Button>

            <Button variant="secondary"
              onClick={() => this.getModal()}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>

      </div >
    );
  }
}
