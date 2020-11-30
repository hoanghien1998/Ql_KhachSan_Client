import React, { Component } from 'react'
import {Container} from 'react-bootstrap';
import { BrowserRouter} from 'react-router-dom';
import Slider from './component/Slider';
import Menu1 from './component/Menu1';

import Footer from './component/Footer';
import { Route, Switch} from 'react-router-dom'
import Home from './component/Home';
import Room from './component/Room';
import Restaurant from './component/Restaurant';
import About from './component/About';
import BookRom from './component/BookRoom';
import Contact from './component/Contact';
import Cart from './component/Cart';

export default class Trangchu extends Component {
    // constructor(){
    //     super();
    //     this.state ={
    //       direct: false
    //     }
    //   }
    //   setdirect = () =>{
    //     this.setState ({direct:true})
    //   }
    
    //   renderdirect = () => {
    //     if(this.state.direct)
    //       return <Redirect to = "/"/>
    //   }
    render() {
        return (
        <BrowserRouter>
        {/* {this.renderdirect()} */}
        <Container fluid style={{margin:'0',padding:'0'}}>
            {/* <Menu1 setdirect={this.setdirect}/> */}
            <Menu1/>
            <Slider/>
            <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/rooms" component={Room}/>
                    <Route exact path="/restaurant" component={Restaurant}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route exact path="/bookroom" component={BookRom}/>
                    <Route exact path="/cart" component={Cart}/>
            </Switch>        
            <Footer/>
            
        </Container>
    </BrowserRouter>
        )
    }
}
