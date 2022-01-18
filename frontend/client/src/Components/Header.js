import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { strings } from '../Languages/Strings';
import { AppContext } from "../Contexts/AppContext";
import "../Styles/styles.css"

const Header = () => {

    const { currentLanguage, changeLanguage, } = useContext(AppContext)

    const [showMenu, setshowMenu] = useState(false)


    return (
        <div className='headerContainer' >

            <div className='headerMobileInnerContainer'>
                {/* mobile menu */}
                <div onClick={() => setshowMenu(!showMenu)} className='hamburgerMenu' >
                    <i className='fas fa-bars' />
                </div>
                {showMenu &&
                    <div className='mobileSpinner'>
                        <div>
                    <Link
                        className="headerItem"
                        to={`/`}>
                        <p>{strings.homepage}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        className="headerItem"
                        to={`/listpatients`}>
                        <p>{strings.listpatients}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        className="headerItem"
                        to={`/about`}>
                        <p>{strings.about}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        className="headerItem"
                        to={`/contact`}>
                        <p>{strings.contact}</p>
                    </Link>
                </div>
                <div className="headerItem dropdown">
                    {strings.responsible} <i className="fas fa-angle-down fa-xs"></i>
                    <div className='dropdown-content'>
                        <Link
                            className="dropdown-item"
                            to={`/addpatient`}>
                            <p>{strings.addpatient}</p>
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`/login`}>
                            <p>{strings.headerLogin}</p>
                        </Link>
                    </div>
                </div>
                <div>
                    {currentLanguage === "en" ?
                        <span
                            className="headerItem"
                            onClick={() => changeLanguage("tr")}
                        >
                            <p>TR</p>
                        </span>
                        :
                        <span
                            className="headerItem"
                            onClick={() => changeLanguage("en")}
                        >
                            <p>EN</p>
                        </span>
                    }
                </div>
                    </div>

                }
            </div>




            <div className='headerInnerContainer' >
                {/* desktop menu */}
                <div>
                    <Link
                        className="headerItem"
                        to={`/`}>
                        <p>{strings.homepage}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        className="headerItem"
                        to={`/listpatients`}>
                        <p>{strings.listpatients}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        className="headerItem"
                        to={`/about`}>
                        <p>{strings.about}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        className="headerItem"
                        to={`/contact`}>
                        <p>{strings.contact}</p>
                    </Link>
                </div>
                <div className="headerItem dropdown">
                    {strings.responsible} <i className="fas fa-angle-down fa-xs"></i>
                    <div className='dropdown-content'>
                        <Link
                            className="dropdown-item"
                            to={`/addpatient`}>
                            <p>{strings.addpatient}</p>
                        </Link>
                        <Link
                            className="dropdown-item"
                            to={`/login`}>
                            <p>{strings.headerLogin}</p>
                        </Link>
                    </div>
                </div>
                <div>
                    {currentLanguage === "en" ?
                        <span
                            className="headerItem"
                            onClick={() => changeLanguage("tr")}
                        >
                            <p>TR</p>
                        </span>
                        :
                        <span
                            className="headerItem"
                            onClick={() => changeLanguage("en")}
                        >
                            <p>EN</p>
                        </span>
                    }
                </div>

            </div>
        </div>
    )
}

export default Header
