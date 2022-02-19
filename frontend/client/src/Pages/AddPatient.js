import React, { useContext, useState } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer";
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";

const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

const AddPatient = () => {
    const { } = useContext(AppContext)
    const [formReceivedMessage, setFormReceivedMessage] = useState("")
    const [step, setStep] = useState(1)
    const [emailState, setEmailState] = useState("")
    const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false)



    const addPatientValidationSchema = Yup.object().shape({

        name: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        surname: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        dateOfBirth: Yup.string()
            .min(10, strings.tooShort)
            .max(10, strings.tooLong)
            .required(strings.required),
        weight: Yup.number()
            .min(1, strings.weightTooLow)
            .required(strings.required),
        resName: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        resPhone: Yup.string()
            .min(10, strings.tooShort)
            .max(20, strings.tooLong)
            .required(strings.required),
        resEmail: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        collectedAmount: Yup.number()
            .min(0, strings.collectedAmountTooLow)
            .required(strings.required),
        requiredAmount: Yup.number()
            .required(strings.required),
        iban: Yup.string()
            .matches(/^[0-9]+$/, strings.ibanValidation)
            .min(24, strings.ibanValidation)
            .max(24, strings.ibanValidation)
            .required(strings.required),
        termsandconditions: Yup.boolean()
            .required(strings.termsAndConditionsRequired)
            .oneOf([true], strings.termsAndConditionsRequired),
        instagramLink: Yup.string()
            .max(100, strings.tooLong),
        facebookLink: Yup.string()
            .max(100, strings.tooLong),
        city: Yup.string()
            .min(2, strings.tooShort)
            .max(20, strings.tooLong)

    });

    if (step === 1) {
        return (
            <div className='pageContainer' >
                <Header />
                <div className='innerPageContainer' >
                    {strings.addpatient}

                    <div className='addPatientFormArea'>

                        <Formik
                            initialValues={{ name: "", surname: "", dateOfBirth: "", weight: "", city: "", resName: "", resPhone: "", resEmail: "", collectedAmount: "", requiredAmount: "", iban: "", instagramLink: "", facebookLink: "", termsandconditions: false, photo: "default.png" }}
                            validationSchema={addPatientValidationSchema}
                            onSubmit={async (values) => {
                                setEmailState(values.resEmail)

                                values.name = titleCase(values.name)
                                values.surname = titleCase(values.surname)
                                values.city = titleCase(values.city)
                                values.resName = titleCase(values.resName)

                                values.iban = "TR".concat(values.iban)
                                values.instagramLink = "https://www.instagram.com/".concat(values.instagramLink)
                                values.facebookLink = "https://www.facebook.com/".concat(values.facebookLink)

                                let doe = new Date(values.dateOfBirth)
                                doe.setDate(doe.getDate() + 730);
                                values.dateOfEnd = doe;



                                axios.post(`${process.env.REACT_APP_SERVER_URL}/addpatient`, JSON.stringify(values))
                                    .then(response => {
                                        response.data.status !== "error" && setStep(2)
                                        response.data.status === "error" && setEmailAlreadyInUse(true)

                                    }
                                    )
                                    .catch(err => console.log(err.message))
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className='addPatientForm'>

                                    {formReceivedMessage && <div style={{ color: "white", background: "orange", textAlign: "center" }}>{formReceivedMessage}</div>}

                                    <span>{strings.formName}</span>
                                    <Field className="addPatientFormField" name="name" type="text" placeholder={strings.formName} />
                                    {errors.name && touched.name ? (
                                        <div className='formErrorMessage'>{errors.name}</div>
                                    ) : null}

                                    <span>{strings.formSurname}</span>
                                    <Field className="addPatientFormField" name="surname" type="text" placeholder={strings.formSurname} />
                                    {errors.surname && touched.surname ? (
                                        <div className='formErrorMessage'>{errors.surname}</div>
                                    ) : null}

                                    <span>{strings.dateOfBirth}</span>
                                    <Field className="addPatientFormField" name="dateOfBirth" type="date" placeholder={strings.formDateOfBirth} />
                                    {errors.dateOfBirth && touched.dateOfBirth ? (
                                        <div className='formErrorMessage'>{errors.dateOfBirth}</div>
                                    ) : null}

                                    <span>{strings.formWeight}</span>
                                    <Field className="addPatientFormField" name="weight" type="number" placeholder={strings.formWeight} />
                                    {errors.weight && touched.weight ? (
                                        <div className='formErrorMessage'>{errors.weight}</div>
                                    ) : null}

                                    <span>{strings.city}</span>
                                    <Field className="addPatientFormField" name="city" type="text" placeholder={strings.city} />
                                    {errors.city && touched.city ? (
                                        <div className='formErrorMessage'>{errors.city}</div>
                                    ) : null}


                                    <span>{strings.formResponsibleName}</span>
                                    <Field className="addPatientFormField" name="resName" type="text" placeholder={strings.formResponsibleName} />
                                    {errors.resName && touched.resName ? (
                                        <div className='formErrorMessage'>{errors.resName}</div>
                                    ) : null}

                                    <span>{strings.formResponsiblePhone}</span>
                                    <Field className="addPatientFormField" name="resPhone" type="text" placeholder={strings.formResponsiblePhone} />
                                    {errors.resPhone && touched.resPhone ? (
                                        <div className='formErrorMessage'>{errors.resPhone}</div>
                                    ) : null}

                                    <span>{strings.formResponsibleEmail}</span>
                                    <Field className="addPatientFormField" name="resEmail" type="email" placeholder={strings.formResponsibleEmail} />
                                    {errors.resEmail && touched.resEmail ? (
                                        <div className='formErrorMessage'>{errors.resEmail}</div>
                                    ) : null}
                                    {emailAlreadyInUse && <p style={{ color: "red" }}>{strings.emailAlreadyInUse}</p>}

                                    <span>{strings.formCollectedAmount}</span>
                                    <Field className="addPatientFormField" name="collectedAmount" type="number" placeholder={strings.formCollectedAmount} />
                                    {errors.collectedAmount && touched.collectedAmount ? (
                                        <div className='formErrorMessage'>{errors.collectedAmount}</div>
                                    ) : null}

                                    <span>{strings.formRequiredAmount}</span>
                                    <Field className="addPatientFormField" name="requiredAmount" type="number" placeholder={strings.formRequiredAmount} />
                                    {errors.requiredAmount && touched.requiredAmount ? (
                                        <div className='formErrorMessage'>{errors.requiredAmount}</div>
                                    ) : null}


                                    <span>{strings.IBANNumber}</span>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                        <span >TR </span>
                                        <Field className="addPatientFormField" style={{ width: "100%" }} name="iban" type="string" placeholder="000011112222333344445555" />
                                    </div>
                                    {errors.iban && touched.iban ? (
                                        <div className='formErrorMessage'>{errors.iban}</div>
                                    ) : null}

                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                        <span >https://www.instagram.com/ </span>
                                        <Field className="addPatientFormField" style={{ width: "100%" }} name="instagramLink" type="text" placeholder={strings.username} />
                                    </div>
                                    {errors.instagramLink && touched.instagramLink ? (
                                        <div className='formErrorMessage'>{errors.instagramLink}</div>
                                    ) : null}

                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                        <span >https://www.facebook.com/ </span>
                                        <Field className="addPatientFormField" style={{ width: "100%" }} name="facebookLink" type="text" placeholder={strings.username} />
                                    </div>
                                    {errors.facebookLink && touched.facebookLink ? (
                                        <div className='formErrorMessage'>{errors.facebookLink}</div>
                                    ) : null}

                                    <Link style={{ textAlign: "center", margin: "10px 0px" }} to={`/termsandconditions`} target={"_blank"} > {strings.termsAndConditions} </Link>
                                    <label className="addPatientFormField">
                                        <Field name="termsandconditions" type="checkbox" /> {strings.formTermsAndConditions}
                                    </label>
                                    {errors.termsandconditions && touched.termsandconditions ? (
                                        <div className='formErrorMessage'>{errors.termsandconditions}</div>
                                    ) : null}

                                    <button className="addPatientFormButton" type="submit">{strings.submitForm}</button>
                                </Form>
                            )}

                        </Formik>
                    </div>

                </div>


                <Footer />
            </div >
        )
    }
    else if (step === 2) {
        return (
            // valilik izni
            <div className='pageContainer' >
                <Header />
                <div className='innerPageContainer' >
                    {/* {strings.addpatient} */}
                    {strings.uploadGovernmentPermit}

                    <div>
                        <form className='addPermitForm' action={`${process.env.REACT_APP_SERVER_URL}/addpatientpermit`} method="post" encType="multipart/form-data">
                            <input hidden type="text" name="email" value={emailState} />
                            <input type="file" name="governmentPermit" />
                            <button type='submit'>{strings.submitForm}</button>
                        </form>
                    </div>

                </div>


                <Footer />
            </div >
        )
    }
}

export default AddPatient
