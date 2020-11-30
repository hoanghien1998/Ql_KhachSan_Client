import React, { Component } from 'react'
import {Calendar} from 'primereact/calendar';
import {Col,Row,Container, Button, Form} from 'react-bootstrap'
import Axios from 'axios';

export default class BookRoom extends Component {
    constructor(){
        super();
        this.state = {
            datenhan: null,
            datetra: null,
            slphong:1,
            songuoilon:1,
            sotre:0,
            hoten:'',
            email:'',
            diachi:'',
            sdt:'',
            cmnd:'',
            thongbao:''
        };
    }

    luuNhap = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    Hoantatdatphong = (tb) =>{
        alert(tb);
        this.setState({datenhan:null, datetra:null, slphong:1, songuoilon:1, sotre:0, hoten:'', email:'', diachi:'',sdt:'',cmnd:''});                      
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let frmdata = new FormData();
        // dinh dang nam thang ngay, dinh dang gio quoc te,
        frmdata.append("datenhan", new Intl.DateTimeFormat('fr-ca').format(this.state.datenhan));
        frmdata.append("datetra", new Intl.DateTimeFormat('fr-ca').format(this.state.datetra));
        frmdata.append("slphong", this.state.slphong);
        frmdata.append("songuoilon", this.state.songuoilon);
        frmdata.append("sotre", this.state.sotre);
        frmdata.append("hoten", this.state.hoten);
        frmdata.append("email", this.state.email);
        frmdata.append("diachi", this.state.diachi);
        frmdata.append("sdt", this.state.sdt);
        frmdata.append("cmnd", this.state.cmnd);

        
        const url = "http://localhost:8080/doan/DatPhong.php";

        // Axios.post(url, frmdata).then(res => this.setState({thongbao: res.data})).catch(err => this.setState({thongbao:err}));
        Axios.post(url, frmdata).then(res => this.Hoantatdatphong(res.data)).catch(err => alert(err));
    }
    render() {
        console.log(new Intl.DateTimeFormat('fr-ca').format(this.state.datenhan));
        return (
            <div style={{backgroundImage:'url(images/restaurant-pattern.jpg)'}}>
            
            <Container style={{marginTop:"30px"}}>
                <Row>
                <h3>Booking Information</h3>
                </Row>
                <Row>
                   
                    <Col md={4}>
                        <h5>Check in date</h5>
                        <Calendar name="datenhan" value={this.state.datenhan} onChange={this.luuNhap} showIcon={true} />
                    </Col>
                    <Col md={4}>
                        <h5>Check-out date</h5>
                        <Calendar name="datetra" value={this.state.datetra} onChange={this.luuNhap} showIcon={true} />
                    </Col>
                    <Col md={4}  style={{marginTop:"30px"}}>
                    <Button variant="primary" onClick={this.handleSubmit}>Đặt phòng</Button>{' '}
                    </Col>
                </Row>
                <Row style={{marginTop:"30px"}}>
                    <Col md={3}>
                    <label style={{marginRight:'5px'}}>Room Number</label>
                   <select onChange={this.luuNhap} value={this.state.value} name="slphong">
                       <option value="1"> 1 </option>
                       <option value="2"> 2 </option>
                       <option value="3"> 3 </option>
                       <option value="4"> 4 </option>
                       <option value="5"> 5 </option>
                       <option value="6"> 6 </option>
                       <option value="7"> 7 </option>
                       <option value="8"> 8 </option>
                       <option value="9"> 9 </option>
                       <option value="10"> 10 </option>
                       <option value="11"> 11 </option>
                       <option value="12"> 12 </option>
                       <option value="13"> 13 </option>
                       <option value="14"> 14 </option>
                   </select>
                    </Col>
                    <Col md={3}>
                    <label style={{marginRight:'5px'}}>Adults</label>
                   <select onChange={this.luuNhap} value={this.state.value} name="songuoilon">
                       <option value="1"> 1 </option>
                       <option value="2"> 2 </option>
                       <option value="3"> 3 </option>
                       <option value="4"> 4 </option>
                       <option value="5"> 5 </option>
                       <option value="6"> 6 </option>
                       <option value="7"> 7 </option>
                       <option value="8"> 8 </option>
                       <option value="9"> 9 </option>
                       <option value="10"> 10 </option>
                       <option value="11"> 11 </option>
                       <option value="12"> 12 </option>
                       <option value="13"> 13 </option>
                       <option value="14"> 14 </option>
                   </select>
                    </Col>
                    <Col md={3}>
                    <label style={{marginRight:'5px'}}>Children</label>
                   <select onChange={this.luuNhap} value={this.state.value} name="sotre">
                    <option value="0"> 0 </option>
                       <option value="1"> 1 </option>
                       <option value="2"> 2 </option>
                       <option value="3"> 3 </option>
                       <option value="4"> 4 </option>
                       <option value="5"> 5 </option>
                       <option value="6"> 6 </option>
                       <option value="7"> 7 </option>
                       <option value="8"> 8 </option>
                       <option value="9"> 9 </option>
                       <option value="10"> 10 </option>
                       <option value="11"> 11 </option>
                       <option value="12"> 12 </option>
                       <option value="13"> 13 </option>
                       <option value="14"> 14 </option>
                   </select>
                    </Col>
                    <Col md={3}>
                    </Col>
                </Row>
                <Row>
                    <h3>Personal Information</h3>
                    
                </Row>
                <Row>
                <Form>
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td width="200px">
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={this.luuNhap} name="hoten" value={this.state.hoten}/>
                        
                            </Form.Group>
                            </td>
                            <td></td>
                            <td>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label> Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.luuNhap} name="email" value={this.state.email}/>
                        
                            </Form.Group>
                            </td>
                            <td></td>
                            <td>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" onChange={this.luuNhap} name="diachi" value={this.state.diachi}/>
                        
                            </Form.Group>
                            </td>
                            <td></td>
                            <td>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone" onChange={this.luuNhap} name="sdt" value={this.state.sdt}/>
                        
                            </Form.Group>
                            </td>
                            <td></td>
                            <td>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label>Identity card</Form.Label>
                            <Form.Control type="text" placeholder="Enter identity card" onChange={this.luuNhap} name="cmnd" value={this.state.cmnd}/>
                        
                            </Form.Group>
                            </td>
                        
                        </tr>
                        </tbody>
                    </table>
                </Form>
                </Row>
                <h1>{this.state.thongbao}</h1>
              
            </Container>
            </div>
        )
    }
}
