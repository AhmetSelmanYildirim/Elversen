import "./Responsibles.css"
import React, { useContext } from 'react';
import { AppContext } from "../../Contexts/AppContext";
import Sidebar from "../../Components/Sidebar/Sidebar";


const Responsibles = () => {

    const { isLogon } = useContext(AppContext)

    if (isLogon) {
        return (
            <div className="responsibleOuterContainer">
                <Sidebar />
                <div className="responsibleInnerContainer">
                    Responsibles
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="responsibleOuterContainer">
                <Sidebar />
                <div className="responsibleInnerContainer">
                    Lütfen giriş yapınız.
                </div>
            </div>
        );
    }

};

export default Responsibles;
