import React, {useContext} from 'react'
import Header from '../Components/Header'
import {strings} from "../Languages/Strings";
import {AppContext} from "../Contexts/AppContext";

const ListPatients = () => {
    const {} = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                {strings.listpatients}
            </div>

        </div>
    )
}

export default ListPatients
