// import React from 'react'
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import Menu1 from '../component/Menu1';

import Footer from '../component/Footer';
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from '../component/Home';
import Room from '../component/Room';
import Restaurant from '../component/Restaurant';
import About from '../component/About';
import Contact from '../component/Contact';
import Login from '../component/Login';
import Register from '../component/Register';


export default class Trangchu extends Component {

    constructor() {
        super();
        this.state = {
            token: localStorage.getItem('token') ? localStorage.getItem('token') : "",
            listRoom: localStorage.getItem('room') ? localStorage.getItem('room') : [],
        };
    }

    handleGetToken = (str) => {
        this.setState({
            token: str
        })
    }

    handleAddRoom = (item) => {
        console.log(item);
    }

    render() {
        const { token } = this.state;

        return (
            <BrowserRouter>
                <Container fluid style={{ margin: '0', padding: '0' }}>
                    <Menu1 token={token} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {/* <Route exact path="/rooms" component={Room} /> */}
                        <Route exact path="/rooms">
                            <Room token={token} handleAddRoom={(e) => this.handleAddRoom(e)} />
                        </Route>
                        <Route exact path="/restaurant" component={Restaurant} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/login" component={Login} />
                        {/* <Route exact path="/login">
                            <Login handleGetToken={(e) => this.handleGetToken(e)} />
                        </Route> */}
                        <Route exact path="/register" component={Register} />
                    </Switch>
                    <Footer />

                </Container>
            </BrowserRouter>
        )
    }
}

