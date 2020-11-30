import React, { Component } from 'react'
import { Container,Row,Col,Button } from 'react-bootstrap'
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';


export default class Contact extends Component {
    constructor() {
        super();
        this.state = {
            value: null
        };
    }
    render() {
        return (
            <div>
                 <h1 style={{textAlign:"center", marginTop:'50px', marginBottom:'20px', fontFamily:'Playfair Display', fontStyle:'italic'}}>Contact us</h1>
                 <Container>
                     
                     <Row>
                         <Col md={6}>
                            <iframe title="Resort Roxandrea" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31251.8587994859!2d109.18811173774789!3d11.731030436838513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310ab3f5e83dfc0f%3A0x4ea8f689aca59a13!2sPhan%20Rang%20-%20V%C4%A9nh%20Hy!5e0!3m2!1svi!2s!4v1590150008445!5m2!1svi!2s" width="500" height="450"></iframe>
                         </Col>
                         <Col md={6}>

                         
                        <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} />
                            <label htmlFor="float-input">Username</label>
                        </span>

                        <span className="p-float-label" style={{marginTop:'20px'}}>
                            <InputText id="float-input" type="text" size="30" value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} />
                            <label htmlFor="float-input">Your email</label>
                        </span>
                        <span className="p-float-label" style={{marginTop:'20px'}}>
                            <InputText id="float-input" type="text" size="30" value={this.state.value2} onChange={(e) => this.setState({value2: e.target.value})} />
                            <label htmlFor="float-input">subject</label>
                        </span>

                        <div style={{marginTop:'10px'}}>
                        <label>Message</label>
                        <br></br>
                        <InputTextarea rows={5} cols={30} autoResize={true}></InputTextarea>
                        </div>
                        <Button variant="primary">Send message</Button>{' '}
                             {/* <form>
                                 <input type="text" placeholder="Your name" name="name" marginTop="20px" width="300px"></input>
                                 <br></br>
                                 <input type="text" placeholder="Your email" name="email" marginTop="20px"></input>
                                 <br></br>
                                 <input type="text" placeholder="subject" name="subject" marginTop="20px"></input>
                                 <br></br>
                                 <input type="text" placeholder="Message" name="message" marginTop="20px"></input>
                                 <br></br>
                                 <Button variant="primary">Send message</Button>{' '}
                             </form> */}
                         </Col>
                         
                     </Row>
                 </Container>
            </div>
        )
    }
}
