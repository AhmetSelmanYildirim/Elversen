import React from 'react'
import { strings } from '../Languages/Strings'

const Footer = () => {
    return (
        <div className='footerContainer'>
            <div className='footerInnerContainer'>
                <div className='footerLeft'>
                    <div className='socialMediaIcons'>
                        <a className='socialMediaIcon' href='https://www.facebook.com/ElversenSMA/' target="_blank" rel="noreferrer" > <i className="fab fa-facebook fa-lg"></i></a>
                        <a className='socialMediaIcon' style={{marginLeft:"10px"}} href='https://www.instagram.com/elversensma/' target="_blank" rel="noreferrer" > <i className="fab fa-instagram fa-lg"></i></a>
                        <a className='socialMediaIcon' style={{marginLeft:"10px"}} href='https://twitter.com/ElversenSMA' target="_blank" rel="noreferrer" > <i className="fab fa-twitter fa-lg"></i></a>
                        <a className='socialMediaIcon' style={{marginLeft:"10px"}} href='https://www.linkedin.com/company/elversensma' target="_blank" rel="noreferrer" > <i className="fab fa-linkedin fa-lg"></i></a>
                    </div>
                </div>
                <div className='footerRight'>
                    <span><a className='mailLink' href='mailto:info@elversen.com' >info@elversen.com</a></span>
                </div>
            </div>
        </div>
    )
}

export default Footer
