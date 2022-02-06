import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AppContext = createContext();


export const AppProvider = ({ children }) => {

    const [patients, setPatients] = useState("")
    const [responsibles, setResponsibles] = useState("")
    const [isLogon, setIsLogon] = useState(false);

    const login = async (email, password) => {
        let message = "";
        const info = { email, password }
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, JSON.stringify(info))
            .then(result => {
                result.data === true ? setIsLogon(true) : message = result.data.error;
            })
        return message
    }

    const activateResponsible = (email) => {
        let info = { email }
        axios.put(`${process.env.REACT_APP_SERVER_URL}/r/activateResponsible`, JSON.stringify(info))
    }
    const deactivateResponsible = (email) => {
        let info = { email }
        axios.put(`${process.env.REACT_APP_SERVER_URL}/r/deactivateResponsible`, JSON.stringify(info))
    }
    const activatePatient = (email) => {
        let info = { email }
        axios.put(`${process.env.REACT_APP_SERVER_URL}/p/activatePatient`, JSON.stringify(info))
    }
    const deactivatePatient = (email) => {
        let info = { email }
        axios.put(`${process.env.REACT_APP_SERVER_URL}/p/deactivatePatient`, JSON.stringify(info))
    }

    return (
        <AppContext.Provider
            value={{
                patients,
                setPatients,
                responsibles,
                setResponsibles,
                isLogon,
                login,
                activatePatient,
                activateResponsible,
                deactivatePatient,
                deactivateResponsible,
            }}
        >
            {children}
        </AppContext.Provider>
    )

}