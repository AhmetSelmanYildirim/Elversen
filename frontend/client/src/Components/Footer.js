import React from 'react'
import { strings } from '../Languages/Strings'

const Footer = () => {
    return (
        <div className='footerContainer'>
            <div className='footerInnerContainer'>
                <div className='footerLeft'>
                    <div className='socialMediaIcons'>
                        <a className='socialMediaIcon' href='#' target="_blank" > <i className="fab fa-facebook fa-lg"></i></a>
                        <a className='socialMediaIcon' style={{marginLeft:"10px"}} href='#' target="_blank" > <i className="fab fa-instagram fa-lg"></i></a>
                        <a className='socialMediaIcon' style={{marginLeft:"10px"}} href='#' target="_blank" > <i className="fab fa-twitter fa-lg"></i></a>
                        <a className='socialMediaIcon' style={{marginLeft:"10px"}} href='#' target="_blank" > <i className="fab fa-linkedin fa-lg"></i></a>
                    </div>
                </div>
                <div className='footerRight'>
                    <span>Bi el versen?</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
