import "./Patients.css"
import React, { useContext } from 'react';
import { AppContext } from "../../Contexts/AppContext";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Patients = () => {

    const { isLogon, patients } = useContext(AppContext)
    console.log(patients)

    if (isLogon) {
        return (
            <div className="patientsOuterContainer">
                <Sidebar />
                <div className="patientsInnerContainer">
                    Patients
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="patientsOuterContainer">
                <Sidebar />
                <div className="patientsInnerContainer">
                    Lütfen giriş yapınız.
                </div>
            </div>
        );
    }

};

export default Patients;
