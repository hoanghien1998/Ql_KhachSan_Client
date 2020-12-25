import React, { Component } from 'react'
import {Col,Row} from 'react-bootstrap'
import 'font-awesome/css/font-awesome.min.css';

export default class Footer extends Component {
    render() {
        
        return (
            <div>
                
                    <Row style={{backgroundColor:'black', color:'white', marginTop:'50px'}}>
                        <Col md={6}>
                            <div style={{marginLeft:'50px'}}>
                                <h2>Roxandrea</h2>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                            </div>
                            
                        </Col>
                       
                        <Col md={6}>
                            <div style={{marginLeft:'50px'}}>
                                <h2>Have a Questions?</h2>
                                <p><i className="fas fa-map-marker-alt"></i> 203 Fake St. Mountain View, San Francisco, California, USA</p>
                                <p><i className="fas fa-phone-square-alt"></i> +2 392 3929 210</p>
                                <p><i className="far fa-envelope-open"></i> info@yourdomain.com</p>
                            </div>
                            
                        </Col>
                        
                    </Row>
                
            </div>
        )
    }
}
