import React from 'react'
import { strings } from '../Languages/Strings'

const Footer = () => {
    return (
        <div className='footerContainer'>
            <div className='footerInnerContainer'>
                <div className='footerLeft'>
                    {strings.socialMedia}
                </div>
                <div className='footerRight'>
                    {strings.navigation}
                </div>
            </div>
            <div>
                <p>ASY & HHY</p>
            </div>
        </div>
    )
}

export default Footer
