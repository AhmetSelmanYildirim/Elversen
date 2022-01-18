import { Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'
import axios from 'axios'
import * as Yup from "yup";
import { useLocation } from 'react-router-dom';
import queryString from "query-string"




const Login = () => {
    const { search } = useLocation();
    const { error } = queryString.parse(search)


    const { } = useContext(AppContext)

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        password: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
    });

    return (
        <div className='pageContainer'>

            <Header />

            <div className='innerPageContainer' >
                {strings.headerLogin}
                {error && 
                    <p style={{color:"red"}}>{strings.loginError}</p>
                }
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
