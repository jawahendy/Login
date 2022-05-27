import React, { Component } from 'react';
import './forgotpass.css'
import authSrvc from '../../services/auth.srvc';
import history from '../../history';

export default class Forgotpass extends Component {
    constructor(props) {
        super(props);
        this.handleForgotPass = this.handleForgotPass.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            username: "",
            email: "",
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

    handleForgotPass(e) {
        e.preventDefault();
        authSrvc.Forgotpass(this.state.username, this.state.email).then(
            () => {
                history.push("/emailview");
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
                    <h3>Forgot Password</h3>
                    <div>
                        <span className='title2'>Username</span>
                        <div>
                            <input className='stylingbox' type="text" value={this.state.username}
                                onChange={this.onChangeUsername}></input>
                        </div>
                    </div>
                    <div>
                        <span className='title2'>Email</span>
                        <div>
                            <input className='stylingbox' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='that must be in the following order: characters@characters.domain (characters followed by an @ sign, followed by more characters, and then a "."' type="text"
                                value={this.state.email}
                                onChange={this.onChangeEmail}></input>
                        </div>
                    </div>
                    <div className="posisibutton">
                        <button className='btn1' onClick={this.handleForgotPass}>Reset password</button>
                        <button className='btn1' onClick={() => history.push('/')}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}