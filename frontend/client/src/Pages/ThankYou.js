import React, { useContext } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import {strings} from '../Languages/Strings';
import { AppContext } from '../Contexts/AppContext';

const ThankYou = () => {
    const {} = useContext(AppContext)

    return <div className='pageContainer' >
        <Header />
        <div className='innerPageContainer' >
            <div className='patientAdded'>
                {strings.thanksForContactUs}
            </div>

        </div>
        <Footer />
    </div >;
};

export default ThankYou;
