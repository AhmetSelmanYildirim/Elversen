import React, { useContext, useState } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer";
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";


const AddPatient = () => {
    const { } = useContext(AppContext)
    const [formReceivedMessage, setFormReceivedMessage] = useState("")

    const addPatientValidationSchema = Yup.object().shape({

        name: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        surname: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
        dateofbirth: Yup.string()
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
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
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
            .min(26, strings.tooShort)
            .max(26, strings.tooLong)
            .required(strings.required),
        permit: Yup.string()
            .required(strings.permitRequired),

        termsandconditions: Yup.boolean()
            .required(strings.termsAndConditionsRequired)
            .oneOf([true], strings.termsAndConditionsRequired)

    });


    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                {strings.addpatient}

                <div className='addPatientFormArea'>

                    <Formik
                        initialValues={{ name: "", surname: "", dateofbirth: "", resName: "", resPhone: "", iban: "", permit: "", termsandconditions: false }}
                        validationSchema={addPatientValidationSchema}
                        onSubmit={async (values) => {
                            axios.post(`${process.env.REACT_APP_SERVER_URL}/addpatient`, JSON.stringify(values))
                                .then(response => {
                                    console.log(response.data)
                                    response.data.status === "error" ?
                                        setFormReceivedMessage(strings.mailExists)
                                        :
                                        setFormReceivedMessage(strings.accontCreated)
                                }
                                )
                                .catch(err => console.log(err.message))

                            // values.name = "";
                            // values.surname = "";
                            // values.dateofbirth = "";
                            // values.weight = "";
                            // values.resName = "";
                            // values.resPhone = "";
                            // values.resEmail = "";
                            // values.collectedAmount = "";
                            // values.requiredAmount = "";
                            // values.iban = "";
                            // values.permit = "";
                            // values.termsandconditions = "";
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className='addPatientForm'>

                                {formReceivedMessage && <div style={{color:"white",background:"orange",textAlign:"center"}}>{formReceivedMessage}</div>}


                                <Field className="addPatientFormField" name="name" type="text" placeholder={strings.formName} />
                                {errors.name && touched.name ? (
                                    <div className='formErrorMessage'>{errors.name}</div>
                                ) : null}

                                <Field className="addPatientFormField" name="surname" type="text" placeholder={strings.formSurname} />
                                {errors.surname && touched.surname ? (
                                    <div className='formErrorMessage'>{errors.surname}</div>
                                ) : null}

                                <Field className="addPatientFormField" name="dateofbirth" type="text" placeholder={strings.formDateOfBirth} />
                                {errors.dateofbirth && touched.dateofbirth ? (
                                    <div className='formErrorMessage'>{errors.dateofbirth}</div>
                                ) : null}

                                <Field className="addPatientFormField" name="weight" type="number" placeholder={strings.formWeight} />
                                {errors.weight && touched.weight ? (
                                    <div className='formErrorMessage'>{errors.weight}</div>
                                ) : null}


                                <Field className="addPatientFormField" name="resName" type="text" placeholder={strings.formResponsibleName} />
                                {errors.resName && touched.resName ? (
                                    <div className='formErrorMessage'>{errors.resName}</div>
                                ) : null}

                                <Field className="addPatientFormField" name="resPhone" type="text" placeholder={strings.formResponsiblePhone} />
                                {errors.resPhone && touched.resPhone ? (
                                    <div className='formErrorMessage'>{errors.resPhone}</div>
                                ) : null}

                                <Field className="addPatientFormField" name="resEmail" type="email" placeholder={strings.formResponsibleEmail} />
                                {errors.resEmail && touched.resEmail ? (
                                    <div className='formErrorMessage'>{errors.resEmail}</div>
                                ) : null}

                                <Field className="addPatientFormField" name="collectedAmount" type="number" placeholder={strings.formCollectedAmount} />
                                {errors.collectedAmount && touched.collectedAmount ? (
                                    <div className='formErrorMessage'>{errors.collectedAmount}</div>
                                ) : null}

                                <Field className="addPatientFormField" name="requiredAmount" type="number" placeholder={strings.formRequiredAmount} />
                                {errors.requiredAmount && touched.requiredAmount ? (
                                    <div className='formErrorMessage'>{errors.requiredAmount}</div>
                                ) : null}


                                <Field className="addPatientFormField" name="iban" type="text" placeholder={strings.IBANNumber} />
                                {errors.iban && touched.iban ? (
                                    <div className='formErrorMessage'>{errors.iban}</div>
                                ) : null}
                                <span style={{ textAlign: "center", margin: "10px 0px" }}>-{strings.governmentPermit}-</span>

                                <Field className="addPatientFormField" name="permit" type="file" placeholder={strings.governmentPermit} />
                                {errors.permit && touched.permit ? (
                                    <div className='formErrorMessage'>{errors.permit}</div>
                                ) : null}
                                <Link style={{ textAlign: "center", margin: "10px 0px" }} to={`/termsandconditions`} > {strings.termsAndConditions} </Link>


                                <label className="addPatientFormField">
                                    <Field name="termsandconditions" type="checkbox" /> {strings.formTermsAndConditions}
                                </label>
                                {errors.termsandconditions && touched.termsandconditions ? (
                                    <div className='formErrorMessage'>{errors.termsandconditions}</div>
                                ) : null}

                                <button type="submit">{strings.submitForm}</button>
                            </Form>
                        )}

                    </Formik>
                </div>

            </div>


            <Footer />
        </div>
    )
}

export default AddPatient
