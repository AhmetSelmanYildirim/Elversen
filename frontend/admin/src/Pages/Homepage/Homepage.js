import "./Homepage.css"
import React, { useContext } from 'react';
import { AppContext } from "../../Contexts/AppContext";

const Homepage = () => {

    const { login, isLogon } = useContext(AppContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        login(email, password)
    }

    if (!isLogon) {
        return (
            <div className="container">
                Homepage
                <form className="loginForm" onSubmit={handleSubmit}>
                    <input className="formInput" name="email" type="email" placeholder="email" />
                    <input className="formInput" name="password" type="password" placeholder="parola" />
                    <button className="formInput" type="submit">Giriş yap</button>
                </form>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <a className="menu-item" href="/Patients">Patients </a>
                <a className="menu-item" href="/Responsibles">Responsibles</a>
            </div>
        );
    }

};

export default Homepage;
