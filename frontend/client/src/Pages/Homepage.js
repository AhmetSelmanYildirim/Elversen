import React, {useContext} from 'react'
import Header from '../Components/Header'
import HomepageContent from '../Components/HomepageContent';
import HomepageSlider from '../Components/HomepageSlider'
import {AppContext} from "../Contexts/AppContext";
import Footer from "../Components/Footer"


const Homepage = () => {
    const {} = useContext(AppContext)

    return (
        
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                <HomepageSlider />
                <HomepageContent />
            </div>
            

            <Footer/>
        </div>
    )
}

export default Homepage
