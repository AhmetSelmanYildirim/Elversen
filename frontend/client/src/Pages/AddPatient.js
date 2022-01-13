import React from 'react'
import Header from '../Components/Header'
import { styles } from '../Styles/styles'

const AddPatient = () => {
    return (
        <div className='page-container' style={styles.pageContainer}>
            <Header />
            <div className='innerContainer' style={styles.innerPageContainer}>
                Add Patient
            </div>
        </div>
    )
}

export default AddPatient
