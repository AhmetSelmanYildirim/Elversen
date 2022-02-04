import React, { useContext, useState } from 'react';
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'
import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import * as Yup from "yup";

const ForgottenPassword = () => {

  const { } = useContext(AppContext)
  const [infoMessage, setInfoMessage] = useState(null);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, strings.tooShort)
      .max(50, strings.tooLong)
      .required(strings.required),
  });

  return (
    <div className='pageContainer'>

      <Header />

      <div className='innerPageContainer' >
        {strings.forgottenPassword}

        <Formik initialValues={{ email: "", }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            axios.post(process.env.REACT_APP_FORGET_PASSWORD_URL, JSON.stringify(values))
              .then(response => setInfoMessage(response.data.msg))
              .catch(err => console.log(err.message))
            values.email = "";
          }}
        >
          {({ errors, touched }) => (
            <Form className='loginForm'>
              <Field className="loginFormField" name="email" type="email" placeholder={strings.formEmail} />
              {errors.email && touched.email ? (
                <div className='formErrorMessage'>{errors.email}</div>
              ) : null}

              <button type="submit">{strings.submitForm}</button>
            </Form>
          )}

        </Formik>
        {infoMessage === "error" ?
          <p style={{ color: "red" }}>{strings.forgottenPasswordInfoError}</p>
          :
          infoMessage === "warning" ?
            <p style={{ color: "orange" }}>{strings.forgottenPasswordInfoWarning}</p>
            :
            infoMessage === "confirm" && <p style={{ color: "green" }}>{strings.forgottenPasswordInfoConfirm}</p>
        }

      </div>

      <Footer />
    </div>
  )
};

export default ForgottenPassword;
