import React, { useCallback } from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { useHistory } from 'react-router'
import Footer from './Footer'
import { useMediaQuery } from 'react-responsive'
import ReCAPTCHA from 'react-google-recaptcha'

const Register = ({background}) => {

    const [isVerified, setIsVerified] = useState(true);
    const[email, setEmail] = useState('')
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[invalidUsername, setInvalidUsername] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);  

    const LaptopScreen = useMediaQuery({
        query: '(max-width: 1280px)'
      })

    const onSubmit = (e) => {
        e.preventDefault()
        const newUserInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
                url: '/user/register',
                emailaddress: email,
                username: username,
                password: password })
        }
        registerUserPost(newUserInformation) 
    }

    const registerUserPost = async (newUserInformation) => {
        console.log(newUserInformation)
        const res = await fetch('http://localhost:80/api/index.php', newUserInformation)
        console.log(res);
        const data = await res.json()
        console.log(data);
        console.log(data['response'])
        validateResponseData(data)
      }

    const validateResponseData = (data) => {
        if(data['response'] === "Valid username, account created") { 
                setAccountCreated(true); 
        } else if (data['response'] === "Username is already in use with another account. Try a different username!"){
                setInvalidUsername(true);
        }
    }
    return (
    <div className={background}>
        <div className="register-container">
            <div className="back-arrow">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <a href="#"><i class='bx bxs-left-arrow-circle'></i></a>
                </Link>
            </div>
            {accountCreated ? <h2>Your account was created!</h2> : <h2>Register an account here!</h2>}
            {accountCreated ? <div className="successful-register"><label>Click here to sign in!</label> <Link to="/" ><button className="register-form-submit-button"> Sign in!</button></Link></div>
            : <div>
                <form className="" onSubmit={onSubmit}>
                    <div className="register-form">
                        <label> Enter an email address </label>
                        <input className="register-form-text-input" type="text" placeholder="Email" value={email} onChange={((e) => setEmail(e.target.value))}></input>
                        <label> Enter a username </label>
                        {invalidUsername ? <label className="invalid">Error: Username is already in use with another account. Try a different username!</label> : <label></label>}
                        <input className="register-form-text-input" type="text" placeholder="Username" value={username} onChange={((e) => setUsername(e.target.value))}></input>
                        <label> Enter a password </label>
                        <input className="register-form-text-input" type="password" placeholder="Password" value={password} onChange={((e) => setPassword(e.target.value))}></input> 
                        <ReCAPTCHA
                            sitekey="6LcgeDcdAAAAAOOgGLtrOpC5CcxujIZMLtyd-h33"
                            onChange={() => setIsVerified(false)}
                        />
                        {(isVerified) ? <label className="invalid"> Please verify that you are not a robot! </label> : <label></label>}
                        <input id="registerButton" className="register-form-submit-button" type="submit" placeholder="Login" disabled={isVerified} ></input>
                    </div>
                </form>
            </div> }
            <div className="">
                {LaptopScreen ?  <div></div> : <Footer/>} 
            </div>
        </div>
    </div>
)
}

export default Register
