import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { Button } from "react-bootstrap";
import "../common/login.css";
import Axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
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
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    props.handleGetToken(res.data.token);
                    props.handleGetUser(res.data.user);
                    history.push('/');
                    setEmail("");
                    setPassword("");
                    alert("DAng nhap thanh cong");
                }
            })
                .catch(err => console.log(err));
        }
    };
    const responseGoogle = (res) => {
        const url = "/doan/Ql_KhachSan_Client/backend/Login.php";
        Axios.post(url, res). then(response => alert(response.res) );
        // console.log(res)
    }

    const responseFacebook = (res) => {
        console.log(res);
    }
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
                <Button><Link to="/register" style={{ color: 'white', hover: '#008B8B' }} >Register</Link></Button>
            </div>
            <div>
                <GoogleLogin
                    clientId="1046614447632-i3hsc5liq1scjj818s6kfdj74hihu4oj.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    type={{width: '100%'}}
                />
            </div>
            <div>
                <FacebookLogin
                    appId="140235647703492"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook} 
                    cssClass="css_facebook"/>
            </div>
        </div>

    );
}

export default Login;
