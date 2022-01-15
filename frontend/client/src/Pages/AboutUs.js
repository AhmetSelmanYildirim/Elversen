import React,{useContext} from 'react'
import Header from '../Components/Header'
import {strings} from "../Languages/Strings";
import {AppContext} from "../Contexts/AppContext";
import "../Styles/styles.css"
import Footer from "../Components/Footer"
import HomepageContent from "../Components/HomepageContent"

const AboutUs = () => {
    const {} = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer'>
                {strings.about}
                <HomepageContent/>
            </div>


            <Footer/>
        </div>
    )
}

export default AboutUs
