import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AppContext = createContext();


export const AppProvider = ({ children }) => {

    const [patients, setPatients] = useState("")
    const [responsibles, setResponsibles] = useState("")

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
            }}
        >
            {children}
        </AppContext.Provider>
    )

}