import "./Responsibles.css"
import React, { useContext } from 'react';
import { AppContext } from "../../Contexts/AppContext";


const Responsibles = () => {

    const { isLogon } = useContext(AppContext)

    if (isLogon) {
        return (
            <div>
                Responsibles
            </div>
        );
    }
    else {
        return <div>Lütfen giriş yapınız.</div>
    }

};

export default Responsibles;
