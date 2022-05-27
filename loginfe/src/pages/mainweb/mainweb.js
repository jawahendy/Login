import React, { Component } from 'react';
import authSrvc from '../../services/auth.srvc';
import history from '../../history';
import './mainweb.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Users: authSrvc.getUser()
        };
    }
    render() {
        const { Users } = this.state;
        return (
            <div className='container'>
                <div>
                    <h3>Welcome</h3>
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <div>
                        <p>
                            <span className='title2'>Username : </span>
                            {Users.username}
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className='title2'>Full Name : </span>
                            {Users.fullname}
                        </p>
                    </div>
                    <div className="posisibutton">
                        <button className='btn1' onClick={() => {
                            history.push("/");
                            window.location.reload();
                        }}>Log Out</button>
                    </div>
                </div>
            </div>
        )
    }
}