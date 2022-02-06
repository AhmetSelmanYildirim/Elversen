import "./Homepage.css"
import React, { useContext, useState } from 'react';
import { AppContext } from "../../Contexts/AppContext";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Homepage = () => {

    const { login, isLogon } = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        await login(email, password).then(res => setErrorMessage(res))
    }


    if (!isLogon) {
        return (
            <div className="homepageOuterContainer">
                <Sidebar />
                <div className="homepageInnerContainer">
                    Homepage
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <input className="formInput" name="email" type="email" placeholder="email" />
                        <input className="formInput" name="password" type="password" placeholder="parola" />
                        <button className="formInput" type="submit">Giriş yap</button>
                    </form>
                    {
                        errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>
                    }
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="homepageOuterContainer">
                <Sidebar />
                <div className="homepageInnerContainer">
                    Homepage
                </div>
            </div>
        );
    }

};

export default Homepage;
