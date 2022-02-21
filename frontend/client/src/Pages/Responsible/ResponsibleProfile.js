import React, { useContext, useEffect, useState } from 'react';
import ResponsibleHeader from '../../Components/Responsible/ResponsibleHeader';
import Footer from '../../Components/Footer';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../Contexts/AppContext';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { strings } from '../../Languages/Strings';
import axios from 'axios';


const ResponsibleProfile = ({ authorized }) => {

    const { responsibles, patients } = useContext(AppContext)
    let { id } = useParams();
    const rawId = id;
    id = id.slice(3, id.length - 3);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [responsibleUser, setresponsibleUser] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)
    const [failMessage, setFailMessage] = useState(false)
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState(false)
    const [updateFailMessage, setUpdateFailMessage] = useState(false)
    const [patient, setPatient] = useState("");

    useEffect(() => {
        const getPatientById = async () => {
            const { data } = await axios.post(`${process.env.REACT_APP_PATIENT_URL}/getPatientById`, JSON.stringify({ id: id }))
            setPatient(data[0])

        }
        getPatientById();

    }, [id])

    useEffect(() => {
        if (successMessage) setFailMessage(false)
    }, [successMessage])
    useEffect(() => {
        if (failMessage) setSuccessMessage(false)
    }, [failMessage])
    useEffect(() => {
        if (updateSuccessMessage) setUpdateFailMessage(false)
    }, [updateSuccessMessage])
    useEffect(() => {
        if (updateFailMessage) setUpdateSuccessMessage(false)
    }, [updateFailMessage])



    const resetPasswordValidationSchema = Yup.object().shape({
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

    const patientUpdateValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        surname: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        weight: Yup.number()
            .min(1, strings.weightTooLow)
            .required(strings.required),
        responsiblePhone: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        collectedAmount: Yup.number()
            .min(0, strings.collectedAmountTooLow)
            .required(strings.required),
        requiredAmount: Yup.number()
            .required(strings.required),
        ibanNo: Yup.string()
            .min(26, strings.tooShort)
            .max(26, strings.tooLong)
            .required(strings.required),
        instagramLink: Yup.string()
            .max(100, strings.tooLong),
        facebookLink: Yup.string()
            .max(100, strings.tooLong)
    });


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
                            validationSchema={resetPasswordValidationSchema}

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
                                <Form className='resetPasswordForm'>

                                    <Field className="resetPasswordFormField" name="currentPassword" type="password" placeholder={strings.currentPassword} />
                                    {errors.currentPassword && touched.currentPassword ? (
                                        <div className='formErrorMessage'>{errors.currentPassword}</div>
                                    ) : null}
                                    <Field className="resetPasswordFormField" name="newPassword" type="password" placeholder={strings.newPassword} />
                                    {errors.newPassword && touched.newPassword ? (
                                        <div className='formErrorMessage'>{errors.newPassword}</div>
                                    ) : null}
                                    <Field className="resetPasswordFormField" name="renewPassword" type="password" placeholder={strings.renewPassword} />
                                    {errors.renewPassword && touched.renewPassword ? (
                                        <div className='formErrorMessage'>{errors.renewPassword}</div>
                                    ) : null}

                                    <button className='resetPasswordFormButton' type="submit">{strings.submitForm}</button>
                                </Form>
                            )}
                        </Formik>
                        {successMessage &&
                            <p style={{ color: "green" }}>{strings.passwordChangeSuccess}</p>}
                        {failMessage &&
                            <p style={{ color: "red" }}>{strings.passwordChangeFail}</p>}
                    </div>
                    <div className='updatePatientInfo'>
                        {strings.patientInfo}
                        {patient &&
                            <div className='patientInfoArea'>
                                <Formik
                                    initialValues={{ name: patient.name, surname: patient.surname, weight: patient.weight, collectedAmount: patient.collectedAmount, requiredAmount: patient.requiredAmount, ibanNo: patient.ibanNo, responsiblePhone: patient.responsiblePhone, facebookLink: patient.facebookLink, instagramLink: patient.instagramLink }}
                                    validationSchema={patientUpdateValidationSchema}

                                    onSubmit={async (values) => {
                                        const data = {
                                            id: patient._id,
                                            values
                                        }
                                        await axios.put(`${process.env.REACT_APP_PATIENT_URL}/updatePatient`, JSON.stringify(data))
                                            .then(response => {
                                                response.data.error && setUpdateFailMessage(true)
                                                response.data.msg && setUpdateSuccessMessage(true)
                                            })
                                            .catch(err => console.log(err.message))
                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <Form className='updateInfoForm'>

                                            <span><strong>{strings.formName}</strong></span><Field className="updateInfoFormField" name="name" type="text" placeholder={strings.formName} />
                                            {errors.name && touched.name ? (
                                                <div className='formErrorMessage'>{errors.name}</div>
                                            ) : null}
                                            <span><strong>{strings.formSurname}</strong></span><Field className="updateInfoFormField" name="surname" type="text" placeholder={strings.formSurname} />
                                            {errors.surname && touched.surname ? (
                                                <div className='formErrorMessage'>{errors.surname}</div>
                                            ) : null}
                                            <span><strong>{strings.formWeight}</strong></span><Field className="updateInfoFormField" name="weight" type="number" placeholder={strings.formWeight} />
                                            {errors.weight && touched.weight ? (
                                                <div className='formErrorMessage'>{errors.weight}</div>
                                            ) : null}
                                            <span><strong>{strings.collectedAmount}</strong></span><Field className="updateInfoFormField" name="collectedAmount" type="number" placeholder={strings.collectedAmount} />
                                            {errors.collectedAmount && touched.collectedAmount ? (
                                                <div className='formErrorMessage'>{errors.collectedAmount}</div>
                                            ) : null}
                                            <span><strong>{strings.requiredAmount}</strong></span><Field className="updateInfoFormField" name="requiredAmount" type="number" placeholder={strings.requiredAmount} />
                                            {errors.requiredAmount && touched.requiredAmount ? (
                                                <div className='formErrorMessage'>{errors.requiredAmount}</div>
                                            ) : null}
                                            <span><strong>{strings.IBANNumber}</strong></span><Field className="updateInfoFormField" name="ibanNo" type="text" placeholder={strings.IBANNumber} />
                                            {errors.ibanNo && touched.ibanNo ? (
                                                <div className='formErrorMessage'>{errors.ibanNo}</div>
                                            ) : null}
                                            <span><strong>{strings.formPhone}</strong></span><Field className="updateInfoFormField" name="responsiblePhone" type="text" placeholder={strings.formPhone} />
                                            {errors.responsiblePhone && touched.responsiblePhone ? (
                                                <div className='formErrorMessage'>{errors.responsiblePhone}</div>
                                            ) : null}
                                            <span><strong>{strings.updateFacebookLink}</strong></span><Field className="updateInfoFormField" name="facebookLink" type="text" placeholder={strings.facebookLink} />
                                            {errors.facebookLink && touched.facebookLink ? (
                                                <div className='formErrorMessage'>{errors.facebookLink}</div>
                                            ) : null}
                                            <span><strong>{strings.updateInstagramLink}</strong></span><Field className="updateInfoFormField" name="instagramLink" type="text" placeholder={strings.instagramLink} />
                                            {errors.instagramLink && touched.instagramLink ? (
                                                <div className='formErrorMessage'>{errors.instagramLink}</div>
                                            ) : null}

                                            <button className="updateInfoFormButton" type="submit">{strings.submitForm}</button>
                                        </Form>
                                    )}
                                </Formik>
                                {updateSuccessMessage &&
                                    <p style={{ color: "green" }}>{strings.infoUpdateSuccess}</p>}
                                {updateFailMessage &&
                                    <p style={{ color: "red" }}>{strings.infoUpdateFail}</p>}
                            </div>
                        }
                    </div>
                    <div className='uploadPhotoArea'>
                        {strings.updatePhoto}

                        <div className='uploadPhotoFormArea'>
                            {patient &&
                                patient.photo !== "default.png" ?
                                <img className='photoSMA' src={`${process.env.REACT_APP_SERVER_URL}/${patient.responsibleEmail}/${patient.photo}`}
                                    alt='childsphoto'
                                />
                                :
                                <img className='photoSMA' src={`${process.env.REACT_APP_SERVER_URL}/default.png`}
                                    alt='childsphoto'
                                />
                            }
                            <form className='updatePhotoForm' action={`${process.env.REACT_APP_SERVER_URL}/addpatientphoto`} method="post" encType="multipart/form-data">
                                <input hidden type="text" name="url" value={rawId} />
                                <input hidden type="text" name="email" value={patient.responsibleEmail} />
                                <input type="file" name="photoSMA" />
                                <button type='submit'>{strings.submitForm}</button>
                            </form>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}

export default ResponsibleProfile;
