import React, { useContext, useState } from 'react';
import ResponsibleHeader from '../../Components/Responsible/ResponsibleHeader';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Contexts/AppContext';


const ResponsibleProfile = ({ authorized }) => {

    const { responsibles } = useContext(AppContext)
    let { id } = useParams(); //PARAMETREDEN GELMESİN BODYDEN GELSİN
    const [isAuthorized, setIsAuthorized] = useState(false); 

    id = id.slice(3,id.length-3);

    if (!isAuthorized) {
        if (responsibles) {
            const user = responsibles.find(item => item._id === id);
            if (user) { setIsAuthorized(true) }
            else{ window.location.href="/login?error=1"}
        }
        return <div> Loading...  </div>
    }
    else {
        return (
            <div className='pageContainer'>
                <ResponsibleHeader />
                <div className='pageInnerContainer'>
                    <div style={{ marginTop: "200px" }}>
                        {id}
                    </div>
                </div>

            </div>
        );
    }




}

export default ResponsibleProfile;
