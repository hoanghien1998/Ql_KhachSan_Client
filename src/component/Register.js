import React, {useContext, useState} from 'react'
import {MyContext} from '../contexts/MyContext'
import "../common/login.css";
import {Link, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import $ from "jquery";

const REGEX_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
function Register() {
    const [email, setEmail] = useState("hoanghien@gmail.com");
    const [password, setPassword] = useState("Hien123@");
    const history = useHistory();

    const handleError = () => {
        let flag = true;
        if (email.length === 0 || !email) {
            $("#error_email").show();
            $("#error_email").text("Email không được để trống hoặc không chính xác!!!");
            flag = false;
        } else {
            $("#error_email").hide();
        }

        if (password.length === 0 || !REGEX_PASS.test(password)) {
            $("#error_password").show();
            $("#error_password").text("Mật khẩu tối thiểu 8 ký tự và có ký tự đặt biệt hoặc hoa thường!!!");
            flag = false;
        } else {
            $("#error_password").hide();
        }
        return flag;
    };
    return (
        <div className="_loginRegister">
            <h1>Register</h1>

            <div className="form-control">
                <label>Full Name</label>
                <input name="name" required type="text" placeholder="Enter your name"/>
            </div>
            <div className="form-control">
                <label>Email</label>
                <input name="email" required type="email" placeholder="Enter your email"/>
            </div>
            <div className="form-control">
                <label>Password</label>
                <input name="password" required type="password" placeholder="Enter your password"/>
            </div>

            <div className="form-control">
                <button type="submit">Register</button>
            </div>

            <div className="_navBtn">
                <Button><Link to="/register" style={{color: 'white', hover: '#008B8B'}}>Login</Link></Button>
            </div>
        </div>
    );
}

export default Register