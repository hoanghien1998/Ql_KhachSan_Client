import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import Menu1 from './component/Menu1';
import Footer from './component/Footer';
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from './component/Home';
import Room from './component/Room';
import Restaurant from './component/Restaurant';
import About from './component/About';
import Contact from './component/Contact';
import Login from './component/Login';
import Register from './component/Register';


function Trangchu(props) {
    const [token, setToken] = useState(
        localStorage.getItem('token') ? localStorage.getItem('token') : ""
    );

    const [rooms, setRooms] = useState(
        localStorage.getItem('room') ? JSON.parse(localStorage.getItem('room')) : [],
    );

    const handleGetToken = (e) => {
        setToken(e);
    }

    const handleAddToCart = (data) => {
        const listRoom = rooms.slice();
        const x = listRoom.find((x) => x.choseID.toString() === data.choseID.toString());
        if (typeof (x) === 'undefined') {
            listRoom.push(data);
        }
        localStorage.setItem('room', JSON.stringify(listRoom));
        setRooms(listRoom);
    }


    return (
        <BrowserRouter>
            <Container fluid style={{ margin: '0', padding: '0' }}>
                <Menu1 token={token} />
                <Switch>
                    {/* <Route exact path="/" component={Home} /> */}
                    <Route exact path="/" >
                        <Home token={token} handleAddToCart={(e) => handleAddToCart(e)} />
                    </Route>
                    <Route exact path="/rooms" component={Room} />
                    <Route exact path="/restaurant" component={Restaurant} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/login">
                        <Login handleGetToken={(e) => handleGetToken(e)} />
                    </Route>
                    <Route exact path="/register" component={Register} />
                    {/* <Route exact path="/chi-tiet/:id" component={Register} /> */}
                </Switch>
                <Footer />
            </Container>
        </BrowserRouter>
    );
}

export default Trangchu;