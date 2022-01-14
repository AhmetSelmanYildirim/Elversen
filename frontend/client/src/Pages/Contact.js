import React , {useContext} from 'react'
import Header from '../Components/Header'
import {strings} from "../Languages/Strings";
import {AppContext} from "../Contexts/AppContext";



const Contact = () => {
    const {} = useContext(AppContext)
    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                {strings.contact}
            </div>
        </div>
    )
}

export default Contact
