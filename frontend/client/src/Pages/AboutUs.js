import React,{useContext} from 'react'
import Header from '../Components/Header'
import {strings} from "../Languages/Strings";
import {AppContext} from "../Contexts/AppContext";
import "../Styles/styles.css"
import Footer from "../Components/Footer"

const AboutUs = () => {
    const {} = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer'>
                {strings.about}
            </div>


            <Footer/>
        </div>
    )
}

export default AboutUs
