import React, { Component } from 'react';
import './register.css'
import authSrvc from '../../services/auth.srvc';
import history from '../../history';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.state = {
            username: "",
            email: "",
            password: "",
            fullname: ""
        };
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeFullname(e) {
        this.setState({
            fullname: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        authSrvc.register(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.fullname
        ).then(
            () => {
                history.push("/");
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
                    <h3>Sign Up</h3>
                    <div className='row'>
                        <span className='title2'>Username</span>
                        <div>
                            <input className='stylingbox' type="text" value={this.state.username}
                                onChange={this.onChangeUsername}></input>
                        </div>
                    </div>
                    <div>
                        <span className='title2'>Email</span>
                        <div>
                            <input className='stylingbox' type="text" value={this.state.email}
                                onChange={this.onChangeEmail}></input>
                        </div>
                    </div>
                    <div>
                        <span className='title2'>Password</span>
                        <div>
                            <input className='stylingbox' type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                value={this.state.password}
                                onChange={this.onChangePassword} required></input>
                        </div>
                    </div>
                    <div>
                        <span className='title2'>Full Name</span>
                        <div>
                            <input className='stylingbox' type="text" value={this.state.fullname}
                                onChange={this.onChangeFullname}></input>
                        </div>
                    </div>
                    <div>
                        <input type="file"
                            id="avatar" name="avatar"
                            accept="image/png, image/jpeg"></input>
                    </div>
                    <div className="posisibutton">
                        <button className='btn2' onClick={this.handleRegister}>Register</button>
                        <button className='btn2' onClick={() => history.push('/')}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}