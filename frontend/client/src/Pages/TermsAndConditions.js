import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'


const TermsAndConditions = () => {

    const { } = useContext(AppContext)

    return (
        <div className='pageContainer'>
            <Header />

            <div className='innerPageContainer' >
                {strings.termsAndConditions}
                <div className='aboutUsParagraph'>
                    <p>{strings.termsText1}</p>
                    <p>{strings.termsText2}</p>
                    <p>{strings.termsText3}</p>
                    <p>{strings.termsText4}</p>
                    <p>{strings.termsText5}</p>
                    <p>{strings.termsText6}</p>
                    <p>{strings.termsText7}</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default TermsAndConditions
