import React from 'react'
import { Link } from 'react-router-dom';
import { strings } from '../Languages/Strings';


const HomepageContent = () => {
    return (
        <div className='homepageContent'>
            <p>{strings.hText1}</p>
            <p>{strings.hText2}</p>
            <p>{strings.hText3}</p>
            <p>{strings.hText4}</p>
            <Link className="headerItem"
                to={`/about`}>
                <p>{strings.hText5}</p>
            </Link>

        </div>
    )
}

export default HomepageContent
