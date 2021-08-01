import './Login.css';
import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../context/context'

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const {isAuthenticated, setAuthenticated} = useContext(AppContext);
    let history = useHistory();

    function sendLoginRequest() {
        axios.post(`http://127.0.0.1:8080/api/login`, {email, password})
            .then(res => {
                if (res.data.success === "true") {
                    localStorage.setItem('token', res.data.token.access_token);
                    setAuthenticated(true);
                    history.push('/authenticatedPage');
                }
            }).catch(error => {
            setError('invalid Credentials');
        })
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h2 className="active"> Sign In </h2>

                <form method='POST'>
                    <input required onChange={e => setEmail(e.target.value)} type="text" id="login"
                           className="fadeIn second"
                           name="login" placeholder="login"/>
                    <input required onChange={e => setPassword(e.target.value)} type="text" id="password"
                           className="fadeIn third" name="login" placeholder="password"/>
                    <button type="button" onClick={sendLoginRequest} className="btn btn-success">Log in</button>
                    {error ? <div style={{color: 'red'}}>{error}</div> : ""}
                </form>

            </div>
        </div>
    );
}

export default Login;
