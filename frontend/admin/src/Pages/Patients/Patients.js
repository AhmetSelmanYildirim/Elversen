import "./Patients.css"
import React, { useContext } from 'react';
import { AppContext } from "../../Contexts/AppContext";

const Patients = () => {

    const { isLogon } = useContext(AppContext)

    if(isLogon){
        return (
            <div>
                Patients
            </div>
        );
    }
    else{
        return <div>Lütfen giriş yapınız.</div>
    }
};

export default Patients;
