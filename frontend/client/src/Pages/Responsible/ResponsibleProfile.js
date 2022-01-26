import React, { useContext, useEffect, useState } from 'react';
import ResponsibleHeader from '../../Components/Responsible/ResponsibleHeader';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Contexts/AppContext';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { strings } from '../../Languages/Strings';
import axios from 'axios';


const ResponsibleProfile = ({ authorized }) => {

    const { responsibles } = useContext(AppContext)
    let { id } = useParams(); //PARAMETREDEN GELMESİN BODYDEN GELSİN
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [responsibleUser, setresponsibleUser] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)
    const [failMessage, setFailMessage] = useState(false)

    useEffect(() => {
        if (successMessage) setFailMessage(false)
    }, [successMessage])
    useEffect(() => {
        if (failMessage) setSuccessMessage(false)
    }, [failMessage])

    const contactValidationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),

        newPassword: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),

        renewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], strings.passwordMatch)

    });

    id = id.slice(3, id.length - 3);

    if (!isAuthorized) {
        if (responsibles) {
            const user = responsibles.find(item => item._id === id);
            setresponsibleUser(user)
            if (user) { setIsAuthorized(true) }
            else { window.location.href = "/login?error=1" }
        }
        return <div> Loading...  </div>
    }
    else {
        return (
            <div className='pageContainer'>
                <ResponsibleHeader />
                <div className='responsivePageInnerContainer'>
                    <div className='resetPasswordArea'>
                        {strings.resetPassword}
                        <Formik
                            initialValues={{ currentPassword: "", newPassword: "", renewPassword: "" }}
                            validationSchema={contactValidationSchema}

                            onSubmit={async (values) => {
                                const data = {
                                    id,
                                    currentPassword: values.currentPassword,
                                    newPassword: values.newPassword,
                                }
                                axios.post(`${process.env.REACT_APP_RESET_PASSWORD_URL}`, JSON.stringify(data))
                                    .then(response => {
                                        response.data.error && setFailMessage(true)
                                        response.data.msg && setSuccessMessage(true)
                                    })
                                    .catch(err => console.log(err.message))

                                values.currentPassword = "";
                                values.newPassword = "";
                                values.renewPassword = "";

                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className='contactForm'>

                                    <Field className="contactFormField" name="currentPassword" type="password" placeholder={strings.currentPassword} />
                                    {errors.currentPassword && touched.currentPassword ? (
                                        <div className='formErrorMessage'>{errors.currentPassword}</div>
                                    ) : null}
                                    <Field className="contactFormField" name="newPassword" type="password" placeholder={strings.newPassword} />
                                    {errors.newPassword && touched.newPassword ? (
                                        <div className='formErrorMessage'>{errors.newPassword}</div>
                                    ) : null}
                                    <Field className="contactFormField" name="renewPassword" type="password" placeholder={strings.renewPassword} />
                                    {errors.renewPassword && touched.renewPassword ? (
                                        <div className='formErrorMessage'>{errors.renewPassword}</div>
                                    ) : null}

                                    <button type="submit">{strings.submitForm}</button>
                                </Form>
                            )}
                        </Formik>
                        {successMessage &&
                            <p style={{color:"green"}}>{strings.passwordChangeSuccess}</p>}
                        {failMessage &&
                            <p style={{color:"red"}}>{strings.passwordChangeFail}</p>}
                    </div>
                    <div className='updatePatientInfo'>
                        {strings.patientInfo}
                    </div>
                </div>
                <div>
                    {/* {console.log(responsibleUser)} */}
                </div>

            </div>
        );
    }




}

export default ResponsibleProfile;
