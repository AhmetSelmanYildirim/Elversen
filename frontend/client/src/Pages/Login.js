import { Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'
import axios from 'axios'
import * as Yup from "yup";




const Login = () => {

    const { } = useContext(AppContext)

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .min(2, strings.tooShort )
            .max(50, strings.tooLong)
            .required(strings.required),
        password: Yup.string()
            .min(2, strings.tooShort )
            .max(50, strings.tooLong)
            .required(strings.required),
    });

    return (
        <div className='pageContainer'>
            <Header />

            <div className='innerPageContainer' >
                {strings.headerLogin}

                <Formik initialValues={{ email: "", password: "" }}
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
                                <div>{errors.email}</div>
                            ) : null}
                            <Field className="loginFormField" name="password" type="password" placeholder={strings.formPassword} />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}

                            {/* <Field className="loginFormField" name="email" type="email" placeholder={strings.formEmail} />
                            <Field className="loginFormField" name="password" type="password" placeholder={strings.formPassword} /> */}
                            <button type="submit">{strings.submitForm}</button>
                        </Form>
                    )}
                </Formik>

            </div>

            <Footer />
        </div>
    )
}

export default Login
