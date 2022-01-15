import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { strings } from '../Languages/Strings';
import { AppContext } from "../Contexts/AppContext";
import "../Styles/styles.css"

const Header = () => {

    const { currentLanguage, changeLanguage, } = useContext(AppContext)

    return (
        <div className='headerContainer' >
            <div className='headerInnerContainer' >
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
                        to={`/addpatient`}>
                        <p>{strings.addpatient}</p>
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
                <div>
                    <Link
                        className="headerItem"
                        to={`/login`}>
                        <p>{strings.headerLogin}</p>
                    </Link>
                </div>
                <div>
                    {currentLanguage === "en" ?
                        <img className="headerLang" onClick={() => changeLanguage("tr")} src="./img/tr-icon.png"
                            alt="tr" />
                        :
                        <img className="headerLang" onClick={() => changeLanguage("en")} src="./img/en-icon.png"
                            alt="en" />
                    }
                </div>

            </div>
        </div>
    )
}

export default Header
