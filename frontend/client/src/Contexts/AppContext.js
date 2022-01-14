import React, {useState, createContext} from "react";
import {strings} from "../Languages/Strings";

export const AppContext = createContext();

export const AppProvider = ({children}) => {

    const [currentLanguage, setCurrentLanguage] = useState(strings.getLanguage())
    const changeLanguage = (newLanguage) => {
        strings.setLanguage(newLanguage)
        setCurrentLanguage(newLanguage)
        localStorage.setItem("language", newLanguage);
    }

    return(
        <AppContext.Provider
            value={{
                currentLanguage,
                changeLanguage
            }}
            >
            {children}
        </AppContext.Provider>
    )

}