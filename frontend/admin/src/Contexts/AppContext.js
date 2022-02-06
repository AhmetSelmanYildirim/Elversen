import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AppContext = createContext();


export const AppProvider = ({ children }) => {

    const [patients, setPatients] = useState("")
    const [responsibles, setResponsibles] = useState("")
    const [isLogon, setIsLogon] = useState(false);

    
    const login = async (email, password) => {
        // email şifre backende gönder
        const info = { email, password }
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, JSON.stringify(info))
            .then(result => {
                console.log(result)
                // validse setIsLogon(true)
            })
    }

    useEffect(() => {

        // const getResponsibles = async () => {
        //     const { data } = await axios(`${process.env.REACT_APP_SERVER_URL}/getResponsibles`)
        //     // console.log(data)
        //     setResponsibles(data);
        // }
        // getResponsibles();

        // const getPatients = async () => {
        //     const { data } = await axios(`${process.env.REACT_APP_SERVER_URL}/getPatients`)
        //     // console.log(data)
        //     setResponsibles(data);
        // }
        // getPatients();

    }, [])


    return (
        <AppContext.Provider
            value={{
                patients,
                responsibles,
                isLogon,
                login
            }}
        >
            {children}
        </AppContext.Provider>
    )

}