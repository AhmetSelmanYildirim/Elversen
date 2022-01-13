import React from 'react'
import Header from '../Components/Header'
import { styles } from '../Styles/styles'

const AboutUs = () => {
    return (
        <div className='page-container' style={styles.pageContainer}>
            <Header />
            <div className='innerContainer' style={styles.innerPageContainer}>
                About
            </div>
        </div>
    )
}

export default AboutUs
