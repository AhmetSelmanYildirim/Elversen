import React from 'react'
import { Link } from 'react-router-dom';
import { strings } from '../Languages/Strings';
import { styles } from '../Styles/styles';

const Header = () => {
    return (
        <div className='header-container' style={styles.headerContainer} >
            <div className='header-inner-container' style={styles.headerInnerContainer}>

                <div>
                    <Link
                        style={styles.headerItem}
                        to={`/addpatient`}>
                        <p>{strings.addpatient}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        style={styles.headerItem}
                        to={`/listpatients`}>
                        <p>{strings.listpatients}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        style={styles.headerItem}
                        to={`/about`}>
                        <p>{strings.about}</p>
                    </Link>
                </div>
                <div>
                    <Link
                        style={styles.headerItem}
                        to={`/contact`}>
                        <p>{strings.contact}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
