import React from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function Menu1(props) {
    const history = useHistory();
    // const dd = {
    //     marginLeft: "50px",
    //     fontFamily: "Poppins",
    //     fontWeight: "bold",
    // };
    // const css = {
    //     marginLeft: "250px",
    //     fontFamily: "Poppins",
    //     fontWeight: "bold",
    // };
    return (
        <Navbar bg="light" expand="lg" className="sticky-top">
            <Navbar.Brand href="/" style={{
                marginLeft: "30px",
                fontFamily: "Poppins",
                fontWeight: "bold",
            }}>
                ROXANDREA
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{marginLeft: "130px"}}>
                    <Nav.Link href="/" style={{
                        marginTop: "8px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                    }}>
                        TRANG CHỦ
                    </Nav.Link>
                    {/* <Nav.Link href="bookroom" style={dd}>BookRoom</Nav.Link> */}
                    <Nav.Link href="rooms" style={{
                        marginLeft: "30px",
                        marginTop: "8px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                    }}>
                        PHÒNG
                    </Nav.Link>
                    {/* <Nav.Link href="restaurant" style={dd}>Restaurant</Nav.Link> */}
                    <Nav.Link href="about" style={{
                        marginLeft: "30px",
                        marginTop: "8px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                    }}>
                        GIỚI THIỆU
                    </Nav.Link>
                    <Nav.Link href="contact" style={{
                        marginLeft: "30px",
                        marginTop: "8px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                    }}>
                        LIÊN HỆ
                    </Nav.Link>
                    <Nav.Link href="detail_book" style={{
                        marginLeft: "30px",
                        marginTop: "8px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                    }}>
                        CHI TIẾT ĐẶT PHÒNG
                    </Nav.Link>
                    {props.token.length > 0 ? (
                        <Button onClick={() => {
                            localStorage.clear();
                            history.push("/");
                        }} variant="outline-info" style={{
                            marginLeft: "180px",
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                        }}>Đăng xuất</Button>
                    ) : (
                        <>
                            <Nav.Link href="login" style={{
                                marginLeft: "80px",
                                fontFamily: "Poppins",
                                fontWeight: "bold",
                            }}>
                                {" "}
                                <Button variant="outline-info">Đăng nhập</Button>{" "}
                            </Nav.Link>
                            <Nav.Link href="register" style={{
                                marginLeft: "30px",
                                fontFamily: "Poppins",
                                fontWeight: "bold",
                            }}>
                                {" "}
                                <Button variant="outline-info">Đăng ký</Button>{" "}
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu1;