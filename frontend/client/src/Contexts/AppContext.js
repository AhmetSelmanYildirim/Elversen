import React, { useState, createContext, useEffect } from "react";
import { strings } from "../Languages/Strings";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("language") || "tr")
    const [isResponsibleLogin, setisResponsibleLogin] = useState(false)
    const [patients, setPatients] = useState("")
    const [patient, setPatient] = useState("")
    const [responsibles, setResponsibles] = useState("")
    const [currentResponsible, setCurrentResponsible] = useState("")

    const changeLanguage = (newLanguage) => {
        strings.setLanguage(newLanguage)
        setCurrentLanguage(newLanguage)
        localStorage.setItem("language", newLanguage);
    }

    useEffect(() => {
        setTimeout(() => console.clear(), 200)

        const getIP = async () => {
            await axios.get('https://geolocation-db.com/json/')
                .then(result => axios.post(`${process.env.REACT_APP_SERVER_URL}/ip`, JSON.stringify(result.data)))
        }
        getIP()

        changeLanguage(currentLanguage)

        const getResponsibles = async () => {
            const { data } = await axios(`${process.env.REACT_APP_RESPONSIBLE_URL}/getResponsibles`)
            setResponsibles(data);
        }
        getResponsibles();

        const getPatients = async () => {
            const { data } = await axios(`${process.env.REACT_APP_PATIENT_URL}/getPatients`)
            setPatients(data);
        }
        getPatients();

        // const getPatientById = async (id) => {
        //     const { data } = await axios.post(`${process.env.REACT_APP_PATIENT_URL}/getPatientById`, JSON.stringify({ id: 1 }))
        //     setPatient(data)
        // }
        // getPatientById();

    }, [])


    return (
        <AppContext.Provider
            value={{
                currentLanguage,
                changeLanguage,
                isResponsibleLogin,
                setisResponsibleLogin,
                patients,
                patient,
                responsibles,
                currentResponsible,
                setCurrentResponsible
            }}
        >
            {children}
        </AppContext.Provider>
    )

}