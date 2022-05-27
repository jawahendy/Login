import React, { Component } from 'react';
import '../forgotpass/forgotpass.css'
import authSrvc from '../../services/auth.srvc';
import history from '../../history';

export default class Changepassword extends Component {
    constructor(props) {
        super(props);
        this.handleUpdatePassDB = this.handleUpdatePassDB.bind(this);
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

    handleUpdatePassDB(e) {
        e.preventDefault();
        authSrvc.UpdatedpassDB(this.state.username, this.state.password).then(
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
                    <h3>Update Password</h3>
                    <div>
                        <span className='title2'>Username</span>
                        <div>
                            <input className='stylingbox' type="text" value={this.state.username}
                                onChange={this.onChangeUsername}></input>
                        </div>
                    </div>
                    <div>
                        <span className='title2'>New Password</span>
                        <div>
                            <input className='stylingbox' type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                value={this.state.password}
                                onChange={this.onChangePassword} required></input>
                        </div>
                    </div>
                    <div className="posisibutton">
                        <button className='btn1' onClick={this.handleUpdatePassDB}>Reset password</button>
                        <button className='btn1' onClick={() => history.push('/')}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}