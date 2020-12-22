import React, { Component } from "react";
import { Link } from "react-router-dom"
import "../common/login.css";
import { Axios } from 'axios';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
    }

    handleLogin = () => {
        const { email, password } = this.state;
        Axios.post('/')
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
                        onChange={(e) => this.setState({ email: e.target.value })}
                        type="email"
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-control">
                    <label>PassWord</label>
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <div className="form-control">
                    <button onClick={() => this.handleLogin()} type="submit">Login</button>
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
