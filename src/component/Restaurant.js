import React, { Component } from 'react'
import Axios from 'axios';
import {Col,Row,Container, Button} from 'react-bootstrap'


export default class Restaurant extends Component {
    constructor(){
        super();
        this.state = {
            dsmonan: [],
            cart: []
        }
    }
    
    LayDsMonAn = () => {
        Axios.get('http://localhost:8080/doan/LietKeMonAn.php')
        .then(({data}) => {
            if(data.success === 1){
                this.setState({
                    dsmonan:data.restaurant
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    AddToCart = (mid,hinhanh,ten,sl,gia) => {
    //    let item=[...this.state.cart];
    //    item.push({Ma: id, SL: 1});    
    //    this.setState({cart: item});
      
    let frmdata = new FormData();
    // k nhất thiets trùng tên
    frmdata.append("id",mid);
    frmdata.append("ten",ten);
    frmdata.append("hinhanh",hinhanh);
    frmdata.append("sl",sl);
    frmdata.append("gia",gia);
    var url="http://localhost:8080/doan/themgiohang.php";
   Axios.post(url,frmdata).then(res =>alert(res.data)).catch(err => alert(err));
    
    }

    componentDidMount(){
        this.LayDsMonAn();
    }
    render() {
        const img = {
            borderRadius: '100%'
        };
       
        let res = this.state.dsmonan.map(({id, ten, mota, gia, hinhanh}) => { 
            return(<Col md={6} key={id}>
                <div  style={{border:'1px solid #bd9d1b',borderRadius:'30px',marginTop:'20px',backgroundImage:'url(images/restaurant-pattern.jpg)',width:'100%'}}>
                <table width="100%">
                <tbody>
                    <tr>
                        <td style={{color:'#CCCC00', fontSize:'18pt', textAlign:'center'}}>${gia}</td>
                        <td>{ten}</td>
                        
                        <td rowSpan="2" align="center"><img src={"images/"+ hinhanh} height="100px" width="100px" alt="" style={img}/>
                        <br></br>
                        <Button variant="danger" style={{borderRadius:'30px', marginTop:'5px'}} onClick={this.AddToCart.bind(this,id,hinhanh,ten,1,gia)}>Add</Button>
                        </td>
                    </tr>
                    <tr>
                       
                        <td colSpan="2" style={{textAlign:'center', paddingLeft:'10px'}}>{mota}</td>    
                    </tr>
                    
                </tbody>
                </table>
                </div>
            </Col>);
        })
        return (
            <div>
               
                <h1 style={{textAlign:"center", marginTop:'50px', fontFamily:'Playfair Display', fontStyle:'italic'}}>Restaurant</h1>
                <Container><Row>{res}</Row></Container>
            </div>
        )
    }
}
