import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'
import { useLocation } from 'react-router-dom';
import queryString from "query-string"
// import { Field, Form, Formik } from 'formik'
// import axios from 'axios'
// import * as Yup from "yup";

const Login = () => {
    const { search } = useLocation();
    const { error } = queryString.parse(search)

    const { } = useContext(AppContext)

    // const loginValidationSchema = Yup.object().shape({
    //     email: Yup.string()
    //         .min(2, strings.tooShort)
    //         .max(50, strings.tooLong)
    //         .required(strings.required),
    //     password: Yup.string()
    //         .min(2, strings.tooShort)
    //         .max(50, strings.tooLong)
    //         .required(strings.required),
    // });

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

                {/* FORMIK FORM */}

                {/* <Formik initialValues={{ email: "", password: "" }}
                    validationSchema={loginValidationSchema}
                    onSubmit={async (values) => {
                        axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, JSON.stringify(values))
                            .then(response => console.log(response.data))
                            .catch(err => console.log(err.message))
                        values.email = "";
                        values.password = "";
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className='loginForm'>
                            <Field className="loginFormField" name="email" type="email" placeholder={strings.formEmail} />
                            {errors.email && touched.email ? (
                                <div className='formErrorMessage'>{errors.email}</div>
                            ) : null}
                            <Field className="loginFormField" name="password" type="password" placeholder={strings.formPassword} />
                            {errors.password && touched.password ? (
                                <span className='formErrorMessage'>{errors.password}</span>
                            ) : null}
                            
                            <button type="submit">{strings.submitForm}</button>
                        </Form>
                    )}
                </Formik> */}

                {/* NORMAL FORM */}

                <form className='loginForm' action={`${process.env.REACT_APP_SERVER_URL}/login`} method='post'>
                    <input className="loginFormField" name="email" type="email" placeholder={strings.formEmail} />
                    <input className="loginFormField" name="password" type="password" placeholder={strings.formPassword} />
                    <button type="submit">{strings.submitForm}</button>
                </form>

            </div>

            <Footer />
        </div>
    )
}

export default Login
