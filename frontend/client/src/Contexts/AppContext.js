import React, { useState, createContext, useEffect } from "react";
import { strings } from "../Languages/Strings";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [currentLanguage, setCurrentLanguage] = useState(strings.getLanguage())
    const [isResponsibleLogin, setisResponsibleLogin] = useState(false)
    const [patients, setPatients] = useState("")
    const [patient, setPatient] = useState("")

    const changeLanguage = (newLanguage) => {
        strings.setLanguage(newLanguage)
        setCurrentLanguage(newLanguage)
        localStorage.setItem("language", newLanguage);
    }

    useEffect(() => {
        
        const getPatients = async () => {
            const { data } = await axios(`${process.env.REACT_APP_PATIENT_URL}/getPatients`)
            setPatients(data);
        }
        getPatients();

        const getPatientById = async (id) =>{
            const { data } = await axios.post(`${process.env.REACT_APP_PATIENT_URL}/getPatientById`,JSON.stringify({id:1}))
            setPatient(data)
        }
        getPatientById();

    }, [])


    return (
        <AppContext.Provider
            value={{
                currentLanguage,
                changeLanguage,
                isResponsibleLogin,
                setisResponsibleLogin,
                patients,
                patient
            }}
        >
            {children}
        </AppContext.Provider>
    )

}