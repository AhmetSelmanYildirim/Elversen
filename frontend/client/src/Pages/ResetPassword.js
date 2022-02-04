import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { strings } from "../Languages/Strings"
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import * as Yup from "yup"
import { Formik, Form, Field } from "formik";
import { AppContext } from '../Contexts/AppContext';



const ResetPassword = () => {
  const { responsibles, patients } = useContext(AppContext)
  const { id, token } = useParams()
  const [isTokenValid, setisTokenValid] = useState(false)
  

  useEffect(() => {
    const sendToken = async () => {
      const { data } = await axios.post(`${process.env.REACT_APP_RESPONSIBLE_URL}/resetForgottenPassword`, JSON.stringify({ id, token }))
      data.error && setisTokenValid(false)
      data.msg && setisTokenValid(true)
    }
    sendToken();
  }, []);

  const navigate = useNavigate();

  const resetPasswordValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(2, strings.tooShort)
      .max(50, strings.tooLong)
      .required(strings.required),

    renewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], strings.passwordMatch)
  });

  // Token basariliysa goster
  return (
    <div className='pageContainer'>
      <Header />

      <div className='innerPageContainer' >
        {isTokenValid ?
          <div className='resetPasswordArea'>
            {strings.resetPassword}
            <Formik
              initialValues={{ newPassword: "", renewPassword: "" }}
              validationSchema={resetPasswordValidationSchema}

              onSubmit={async (values) => {
                const data = {
                  id,
                  newPassword: values.newPassword,
                }
                axios.post(`${process.env.REACT_APP_RESPONSIBLE_URL}/saveNewPassword`, JSON.stringify(data))
                  .then(response => { 
                    console.log(response);
                    response.data.msg && navigate("/login")
                   })
                  .catch(err => console.log(err.message))

                values.newPassword = "";
                values.renewPassword = "";

              }}
            >
              {({ errors, touched }) => (
                <Form className='resetPasswordForm'>
                  <Field className="resetPasswordFormField" name="newPassword" type="password" placeholder={strings.newPassword} />
                  {errors.newPassword && touched.newPassword ? (
                    <div className='formErrorMessage'>{errors.newPassword}</div>
                  ) : null}
                  <Field className="resetPasswordFormField" name="renewPassword" type="password" placeholder={strings.renewPassword} />
                  {errors.renewPassword && touched.renewPassword ? (
                    <div className='formErrorMessage'>{errors.renewPassword}</div>
                  ) : null}

                  <button type="submit">{strings.submitForm}</button>
                </Form>
              )}
            </Formik>
          </div>
          :
          <div style={{color:"red", fontSize:"24px"}}> {strings.tokenIsNotValid} </div>
        }
      </div>
      <Footer />
    </div>
  )
};

export default ResetPassword;
