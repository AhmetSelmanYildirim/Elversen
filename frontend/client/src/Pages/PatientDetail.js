import React from 'react'
import Header from '../Components/Header'
import { styles } from '../Styles/styles'

const PatientDetail = () => {
    return (
        <div className='page-container' style={styles.pageContainer}>
            <Header />
            <div className='innerContainer' style={styles.innerPageContainer}>
                Patient Detail
            </div>

        </div>
    )
}

export default PatientDetail
