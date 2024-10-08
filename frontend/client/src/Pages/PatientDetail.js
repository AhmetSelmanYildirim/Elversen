import React, {useContext} from 'react'
import Header from '../Components/Header'
import {strings} from "../Languages/Strings";
import {AppContext} from "../Contexts/AppContext";
import Footer from "../Components/Footer"


const PatientDetail = () => {
    const {} = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header/>
            <div className='innerPageContainer' >
                {strings.patientdetail}
            </div>


            <Footer/>
        </div>
    )
}

export default PatientDetail
