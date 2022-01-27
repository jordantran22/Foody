import React from 'react'
import  {Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router'
import Footer from './Footer';
import {useMediaQuery} from 'react-responsive'

const Login = ({background}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    const history = useHistory()

    const LaptopScreen = useMediaQuery({
        query: '(max-width: 1280px)'
      })

    const onSubmit = (e) => {
        e.preventDefault()

    //     // const userLoginInformation = {
    //     //     method: 'POST',
    //     //     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    //     //     body: JSON.stringify({
    //     //         url: '/user/login',
    //     //         emailaddress: email,
    //     //         username: username,
    //     //         password: password })
    //     // }

        const userLoginInformation = {
         method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
                url: '/user/login',
                username: username,
                password: password })
        }
        userLoginRequest(userLoginInformation);
    }

    const userLoginRequest = async (userLoginInformation) => {
        const res = await fetch('http://localhost:80/api/index.php', userLoginInformation)
        console.log(res);
        const data = await res.json()
        console.log(data);
        console.log(data['response'])

        validateUserLoginRequest(data)
    }

    const validateUserLoginRequest = (data) => {
        if(data['response'] === 'User logged in') {
            localStorage.setItem('username', username);
            history.push('/components/HomePage.js')
        } else {
            setUserLoggedIn(false);
        }
    } 


    return (
        <div className={background}>
            <div className="login-container">
                <h1><i class='bx bxs-pizza'></i> Foody</h1>
                <div>
                    <form className="" onSubmit={onSubmit}>
                        {userLoggedIn ? <label></label>:<label className="invalid">Invalid Username or Password! Please try again!</label>}
                        <div className="login-form">
                            <input className="login-form-text-input" type="text" placeholder="Username" value={username} onChange={((e) => setUsername(e.target.value))}></input>
                            <input className="login-form-text-input" type="password" placeholder="Password" value={password} onChange={((e) => setPassword(e.target.value))}></input>
                            <input className="login-form-submit-button" type="submit" placeholder="Login"></input>
                        </div>
                    </form>
                    <div>
                        <h2>Don't have an account? </h2>
                        <h4 class="link"> <Link to="/components/Register.js" >Sign up here! </Link></h4>
                    </div>
                </div>
            </div>
            <div className="">
                    {LaptopScreen ?  <div></div> : <Footer />} 
            </div>
        </div>
    )
}

export default Login
