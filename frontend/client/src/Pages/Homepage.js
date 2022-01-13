import React from 'react'
import Header from '../Components/Header'
import Slider from '../Components/Slider'
import { styles } from '../Styles/styles'

const Homepage = () => {
    return (
        
        <div className='page-container' style={styles.pageContainer}>
            <Header />
            <div className='innerContainer' style={styles.innerPageContainer}>
                <Slider />
            </div>
        </div>
    )
}

export default Homepage
