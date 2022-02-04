import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'
import { Link, useLocation } from 'react-router-dom';
import queryString from "query-string"

const Login = () => {
    const { search } = useLocation();
    const { error } = queryString.parse(search)

    const { } = useContext(AppContext)

    return (
        <div className='pageContainer'>

            <Header />

            <div className='innerPageContainer' >
                {strings.headerLogin}
                {/* If responsible couldn't found */}
                {error && parseInt(error) === 1 ?
                    <p style={{ color: "red" }}>{strings.loginError}</p> : null
                }
                {error && parseInt(error) === 2 ?
                    <p style={{ color: "orange" }}>{strings.loginAuthorizationError}</p> : null
                }

                <form className='loginForm' action={`${process.env.REACT_APP_SERVER_URL}/login`} method='post'>
                    <input className="loginFormField" name="email" type="email" placeholder={strings.formEmail} />
                    <input className="loginFormField" name="password" type="password" placeholder={strings.formPassword} />
                    <button type="submit">{strings.submitForm}</button>
                </form>

                <Link
                    to={`/forgottenPassword`}>
                    <p>{strings.forgottenPasswordLink}</p>
                </Link>

            </div>

            <Footer />
        </div>
    )
}

export default Login
