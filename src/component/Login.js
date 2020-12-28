import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { Button} from "react-bootstrap";
import "../common/login.css";
import Axios from 'axios';
import $ from 'jquery';
window.$ = $;

const REGEX_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Login(props) {
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

    // Xu ly khi nhan nut login.
    const handleLogin = (e) => {
        // lấy data từ request để đưa xuống backend
        const data = {
            email,
            password
        }
        if (handleError()) {
            const url = "/doan/Ql_KhachSan_Client/backend/Login.php";
            Axios.post(url, data).then(res => {
                if (res.data.status === 422) {
                    alert(res.data.message);
                } if (res.data.status !== 422) {
                    localStorage.setItem('token', res.data.token)
                    props.handleGetToken(res.data.token);
                    history.push('/');
                    setEmail("");
                    setPassword("");
                    // alert("DAng nhap thanh cong");
                }
            })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="_loginRegister">
            <h1>Login</h1>
            <div className="form-control">
                <label>Email</label>
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="Enter your email"
                />
                <p id="error_email" />
            </div>
            <div className="form-control">
                <label>PassWord</label>
                <input
                    name="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                />
                <p id="error_password" />
            </div>

            <div className="form-control">
                <button onClick={() => handleLogin()} type="submit">Login</button>
            </div>
            <div className="_navBtn">
                <Button><Link to="/register" style={{color: 'white', hover:'#008B8B'}} >Register</Link></Button>
            </div>
        </div>
    );
}

export default Login;
