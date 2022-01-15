import { Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'
import axios from 'axios'


const Login = () => {

    const { } = useContext(AppContext)

    return (
        <div className='pageContainer'>
            <Header/>

            <div className='innerPageContainer' >
                {strings.headerLogin}

                <Formik initialValues={{ email:"", password:""}}
                        onSubmit={async (values) => {
                            axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, JSON.stringify(values))
                            .then(response => console.log(response.data))
                            .catch(err => console.log(err.message))

                            values.email="";
                            values.password="";
                        }}
                    >
                        <Form className='loginForm'>
                            <Field className="loginFormField" name="email" type="email" placeholder={strings.formEmail} />
                            <Field className="loginFormField" name="password" type="password" placeholder={strings.formPassword} />
                            <button type="submit">{strings.submitForm}</button>
                        </Form>
                </Formik>

            </div>

            <Footer/>
        </div>
    )
}

export default Login
