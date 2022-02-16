import React, { useContext } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import "../Styles/styles.css"
import Footer from "../Components/Footer"
import HomepageContent from "../Components/HomepageContent"

const AboutUs = () => {
    const { } = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer'>
                <p className='aboutUsTitle'>{strings.about}</p>
                
                <div className='aboutUsParagraph'>
                    <p>{strings.aboutText1}</p>
                    <p>{strings.aboutText2}</p>
                    <p>{strings.aboutText3}</p>
                </div>
                <div className='aboutUsParagraph'>
                    <p className='aboutUsTitle'>{strings.aboutTitle1}</p>
                    <p>{strings.aboutText4}</p>
                </div>
                <div className='aboutUsParagraph'>
                    <p className='aboutUsTitle'>{strings.aboutTitle2}</p>
                    <p>{strings.aboutText5}</p>
                </div>
                <div className='aboutUsParagraph'>
                    <p className='aboutUsTitle'>{strings.aboutTitle3}</p>
                    <p>{strings.aboutText6}</p>
                </div>
                <div className='aboutUsParagraph'>
                    <p className='aboutUsTitle'>{strings.aboutTitle4}</p>
                    <p>{strings.aboutText7}</p>
                    <p>{strings.aboutText8}</p>
                    <p>{strings.aboutText9}</p>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default AboutUs
