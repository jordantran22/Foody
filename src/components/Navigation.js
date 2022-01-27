import React from 'react'
import { useHistory } from 'react-router'

const Navigation = () => {

    const history = useHistory();

    const onLogOut = () => {
        history.push('/')

        const logOutUser = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        }

        logOutUserRequest(logOutUser)

    }


    const logOutUserRequest = async (logOutUser) => {
        const res = await fetch('http://localhost:80/api/index.php?action=logout', logOutUser)
         console.log(res);
        //  const data = await res.json()

    }


    return (
        <div>
            <nav className="navbar">

            <h2 className="navbar-logo"><i class='bx bxs-pizza'></i> Foody</h2>
                <ul className="navbar-list">
                    <li className="navbar-links">
                        Profile
                    </li>

                    <li className="navbar-links">
                        Post a review!
                    </li>
                </ul>

                <button onClick={onLogOut} className="logout-button">Logout</button>
            </nav>

        </div>
    )
}

export default Navigation
