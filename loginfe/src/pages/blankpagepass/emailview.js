import React, { Component } from 'react';
import '../register/register.css'
import history from '../../history';

export default class Emailview extends Component {

    render() {
        return (
            <div className='container'>
                <form>
                    <h3>Please Check email for reset password</h3>
                    <div>
                        <button className='btn2' onClick={() => history.push('/')}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}