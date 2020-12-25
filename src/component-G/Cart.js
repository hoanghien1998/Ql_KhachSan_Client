import React, { Component } from 'react';
import Axios from 'axios';
import {Container, Row, Col,Form,Button} from 'react-bootstrap';
 
class DisplayItem extends Component{
    render(){
        const img = {
            borderRadius: '100%'
        };
        return(
            <tr style={{textAlign:'center'}}>
                           
                <td style={{fontSize:'18pt'}}>{this.props.dulieu.ten}</td>
                <td><img src={"images/"+ this.props.dulieu.hinhanh} height="150px" width="150px" alt="" style={img}/></td>
                <td style={{fontSize:'18pt'}}>
                    <button onClick={this.props.TangGiam.bind(null,this.props.itemindex,"tru")} style={{marginRight:'10px'}}><i className="fas fa-minus"></i></button>
                    {this.props.dulieu.soluong}
                    <button onClick={this.props.TangGiam.bind(null,this.props.itemindex,"cong")} style={{marginLeft:'10px'}}><i className="fas fa-plus"></i></button>
                </td>
                <td>{this.props.dulieu.gia}</td>
                <td>{this.props.dulieu.thanhtien}</td>
                <td><button onClick={this.props.XoaPhanTu.bind(null,this.props.dulieu.id)}>X</button></td>
            </tr>  
        )
    }
}
export default class Cart extends Component {
    constructor(){
        super();
        this.state ={
            cart:[], trangthai: 0, ten:'',sdt:'',dc:'',thanhtien:0, thongbao:'',tong:0
        }
    }

    XoaPhanTuId = (id) =>{
        var items = this.state.cart;
        var item = items.filter(item => item.id === id)[0];
        items.splice(items.indexOf(item),1);
        this.setState({cart:items});
        var frm = new FormData();
        frm.append("cart", JSON.stringify(this.state.cart));
        frm.append("id",id);
        var url ="http://localhost:8080/doan/CapnhatSaukhixoa.php";
        Axios.post(url,frm).then(res =>this.setState({tong:res.data})).catch(err => alert(err));
    }

    // TangSoLuong = (item_index, method)=>{
    //     var items = this.state.cart;
    //     if(method=== "cong")
    //    {
    //        items[item_index].soluong++;
    //     }
    //     var frm = new FormData();
    //     //frm.append("gia",this.state.thanhtien);
    //     frm.append("soluong",items[item_index].soluong);
    //     var url ="http://localhost:8081/doan/Capnhatgiohang.php";
    //     Axios.post(url).then(res =>alert(res.config)).catch(err => alert(err));
    //     // console.log(items[item_index].soluong);
    // }
    TangGiamSoLuong = (item_index, method)=>{
        var items = this.state.cart;
        // var tt = 0;
        if(method=== "cong")
        {
            items[item_index].soluong++;
            items[item_index].thanhtien= items[item_index].soluong * items[item_index].gia;
        }
        else if(this.state.cart[item_index].soluong >1)
        {
            items[item_index].soluong--;
            items[item_index].thanhtien= items[item_index].soluong * items[item_index].gia;
        }
        this.setState({cart:items});
        var frm = new FormData();
        frm.append("cart", JSON.stringify(this.state.cart));
        var url ="http://localhost:8080/doan/Capnhatgiohang.php";
        Axios.post(url,frm).then(res =>this.setState({tong:res.data})).catch(err => alert(err));
     
        //this.CapNhatDuLieu();
    }


    Hoantatdathang = (tb) =>{
        alert(tb);
        this.setState({cart:[],ten:'',sdt:'',dc:'',tong:0});                      
    }

    CapNhatDuLieu = () =>{
        var frm = new FormData();
        frm.append("ten",this.state.ten);
        frm.append("sdt",this.state.sdt);
        frm.append("dc",this.state.dc);
        frm.append("cart", JSON.stringify(this.state.cart));
        frm.append("tong",this.state.tong)
        var url ="http://localhost:8080/doan/XuLy.php";
        Axios.post(url,frm).then(res => this.Hoantatdathang(res.data)).catch(err => alert(err));
        
    }

    luuNhap = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    XoaGioHang = () =>{
        this.setState({cart:[]});
        this.setState({tong:0});
        var url ="http://localhost:8080/doan/XoaGioHang.php";
        Axios.post(url).then(res =>alert(res.data)).catch(err => alert(err));
    }

    componentDidMount(){
        Axios.get('http://localhost:8080/doan/LietKeGioHang.php')
        .then(({data}) => {
            if(data.success === 1){
                this.setState({
                    cart:data.cart,tong: data.tong
                });
            }
            else
            {
                this.setState( {

                    trangthai:1})
            }
        })
        .catch(error => {
            console.log(error);
        })

    }

      render() {
        var HienThi = (data,index) => {
            return(
                <DisplayItem key={data.id} itemindex={index} dulieu={data} XoaPhanTu={this.XoaPhanTuId} TangGiam={this.TangGiamSoLuong}/>
            )
        }
        let res="";
        if(this.state.trangthai === 1)
        {
             res ="NO PRODUCTS IN THE CART";
        }
        else
        {
            res ="PRODUCTS LIST IN CART";
          
       }
        return (

            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                       <div style={{textAlign:'center', fontSize:'20pt',fontFamily:'Poppins',marginTop:'20px'}}>{res}</div> 
                    <table border="1px soild #bd9d1b" style={{margin:'20px auto'}} width="100%">
                    <thead>
                    <tr style={{textAlign:'center', fontSize:'18pt'}}>
                           <th>Food's name</th>
                           <th>Images</th>
                           <th>Amount</th>
                           <th>Price</th>
                           <th>Into Money</th>
                           <th>Task</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.cart.map(HienThi)}
                        <tr>
                        <th style={{textAlign:'center', fontSize:'20pt'}}>Sum</th>
                        <th style={{textAlign:'center', fontSize:'20pt'}}>{this.state.tong}$<input type="hidden" name="tong" value = {this.state.tong}/></th>
                        </tr>
                    </tbody>
                    </table>
                    </Col>
                    </Row>
                   
                    <Row>
                        <Col md={12}>
                        <div style={{marginTop:'20px'}}>
                        <h1 style={{textAlign:'center', fontFamily:'Poppins'}}>CUSTOMER INFORMATION</h1>
                        <Form style={{width:'600px', margin:'20px auto'}}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name </Form.Label>
                                <Form.Control type="text" placeholder="Enter name" name="ten" value={this.state.ten} onChange={this.luuNhap}/>
                                
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Phone" name="sdt" value={this.state.sdt} onChange={this.luuNhap}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" name="dc" value={this.state.dc} onChange={this.luuNhap}/>
                            </Form.Group>
                            {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            
                        </Form>
                        </div>
                        <Button variant="primary" style={{marginLeft:'300px', marginTop:'50px'}} onClick={this.CapNhatDuLieu}>ORDER</Button>
                        <Button variant="primary" style={{marginLeft:'300px', marginTop:'50px'}} onClick={this.XoaGioHang}>CANCEL CART</Button>
                        </Col>
                    </Row>  
               </Container>
            </div>
        )
    }
}
