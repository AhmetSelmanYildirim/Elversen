import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'


const TermsAndConditions = () => {

    const {} = useContext(AppContext)

    return (
        <div className='pageContainer'>
            <Header />

            <div className='innerPageContainer' >
                {strings.termsAndConditions}
            </div>

            <Footer />
        </div>
    )
}

export default TermsAndConditions
