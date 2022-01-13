import React from 'react'
import Header from '../Components/Header'
import { styles } from '../Styles/styles'

const Contact = () => {
    return (
        <div className='page-container' style={styles.pageContainer}>
            <Header />
            <div className='innerContainer' style={styles.innerPageContainer}>
                Contact
            </div>
        </div>
    )
}

export default Contact
