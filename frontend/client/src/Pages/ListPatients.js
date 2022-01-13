import React from 'react'
import Header from '../Components/Header'
import { styles } from '../Styles/styles'

const ListPatients = () => {
    return (
        <div className='page-container' style={styles.pageContainer}>
            <Header />
            <div className='innerContainer' style={styles.innerPageContainer}>
                List Patient
            </div>

        </div>
    )
}

export default ListPatients
