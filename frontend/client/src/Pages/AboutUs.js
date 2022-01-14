import React,{useContext} from 'react'
import Header from '../Components/Header'
import {strings} from "../Languages/Strings";
import {AppContext} from "../Contexts/AppContext";
import "../Styles/styles.css"

const AboutUs = () => {
    const {} = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer'>
                {strings.about}
            </div>
        </div>
    )
}

export default AboutUs
