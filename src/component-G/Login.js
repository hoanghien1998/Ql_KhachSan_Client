import React, { Component } from "react";
import { Link } from "react-router-dom"
import "../common/login.css";
import Axios from 'axios';
import $ from 'jquery';
window.$ = $;

const REGEX_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "Hien123@",
            token: ""
        };
    }

    handleError = () => {
        let flag = true;

        if (this.state.email.length === 0 || !this.state.email) {
            $("#error_email").show();
            $("#error_email").text("Email không được để trống hoặc không chính xác!!!");
            flag = false;
        } else {
            $("#error_email").hide();
        }

        if (this.state.password.length === 0 || !REGEX_PASS.test(this.state.password)) {
            $("#error_password").show();
            $("#error_password").text("Mật khẩu tối thiểu 8 ký tự và có ký tự đặt biệt hoặc hoa thường!!!");
            flag = false;
        } else {
            $("#error_password").hide();
        }
        return flag;
    };

    // Sau khi hoan tat login thi setstate lai form
    Hoantatlogin = (tb) => {
        alert(tb);
        this.setState({ email: null, password: null });
    }

    // Xu ly khi nhan nut login.
    handleLogin = (e) => {
        e.preventDefault();

        // lấy data từ request để đưa xuống backend
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        //  console.log(data)  --- log cái data nhap vo
        if (this.handleError()) {
            const url = "/doan/Ql_KhachSan_Client/backend/Login.php";
            Axios.post(url, data).then(res => {

                // console.log("result",res);
                if (res.data.status === 422) {
                    alert(res.data.message);
                } if (res.data.status !== 422) {
                    localStorage.setItem('token', res.data.token)
                    this.props.handleGetToken(res.data.token);
                    alert("DAng nhap thanh cong");
                    window.location.replace("/");
                    
                }


            })
                // .catch(err => alert(err.data.message));         
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className="_loginRegister">
                <h1>Login</h1>
                {/* <form noValidate onSubmit={(e) => this.handleLogin(e)}> */}
                <div className="form-control">
                    <label>Email</label>
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value }, () => console.log(this.state.email))}
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
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        required
                        placeholder="Enter your password"
                    />
                    <p id="error_password" />
                </div>

                <div className="form-control">
                    <button onClick={this.handleLogin} type="submit">Login</button>
                </div>
                {/* </form> */}
                <div className="_navBtn">
                    <Link to="/register" >Register</Link>
                </div>
            </div>
        );
    }
}

export default Login;
