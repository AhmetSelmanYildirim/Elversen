import React, {useContext} from 'react'
import Header from '../Components/Header'
import Slider from '../Components/Slider'
import {AppContext} from "../Contexts/AppContext";

const Homepage = () => {
    const {} = useContext(AppContext)

    return (
        
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                <Slider />
            </div>
        </div>
    )
}

export default Homepage
