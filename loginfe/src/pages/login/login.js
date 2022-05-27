import React, { Component } from 'react';
import './login.css'
import authSrvc from '../../services/auth.srvc';
import history from '../../history';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();
        authSrvc.login(this.state.username, this.state.password).then(
            () => {
                history.push("/profile");
                window.location.reload();
            },
            error => {
                console.log(error);
            }
        );

    }
    render() {
        return (
            <div className='container'>
                <form>
                    <h3>Sign In</h3>
                    <div>
                        <span className='title2'>Username</span>
                        <div>
                            <input className='stylingbox' type="text" name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername} />
                        </div>
                    </div>
                    <div>
                        <span className='title2'>Password</span>
                        <div>
                            <input className='stylingbox' type="password" name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}></input>
                        </div>
                    </div>
                    <div className="posisibutton">
                        <button className='btn1' onClick={this.handleLogin}>Login</button>
                        <button className='btn2' onClick={() => history.push('/register')}>Register</button>
                        <button className='btn2' onClick={() => history.push('/forgotpass')}>Forgot Password</button>
                    </div>
                </form>
            </div>
        )
    }
}