import React, { useContext } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer";
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';



const AddPatient = () => {
    const { } = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                {strings.addpatient}

                <div className='addPatientFormArea'>

                    <Formik
                        initialValues={{ name: "", surname: "", dateofbirth: "", resName: "", resPhone: "", resMail: "", amount: "", iban: "", permit: "" }}
                        onSubmit={async (values) => {
                            alert(JSON.stringify(values));
                        }}
                    >
                        <Form className='addPatientForm'>
                            <Field className="addPatientFormField" name="name" type="text" placeholder={strings.formName} />
                            <Field className="addPatientFormField" name="surname" type="text" placeholder={strings.formSurname} />
                            <Field className="addPatientFormField" name="dateofbirth" type="text" placeholder={strings.formDateOfBirth} />
                            <Field className="addPatientFormField" name="weight" type="number" placeholder={strings.formWeight} />

                            <Field className="addPatientFormField" name="resName" type="text" placeholder={strings.formResponsibleName} />
                            <Field className="addPatientFormField" name="resPhone" type="text" placeholder={strings.formResponsiblePhone} />
                            <Field className="addPatientFormField" name="resEmail" type="email" placeholder={strings.formResponsibleEmail} />
                            <Field className="addPatientFormField" name="collectedAmount" type="number" placeholder={strings.formCollectedAmount} />
                            <Field className="addPatientFormField" name="requiredAmount" type="number" placeholder={strings.formRequiredAmount} />

                            <Field className="addPatientFormField" name="iban" type="text" placeholder={strings.IBANNumber} />
                            <span style={{ textAlign: "center", margin: "10px 0px" }}>-{strings.governmentPermit}-</span>
                            <Field className="addPatientFormField" name="permit" type="file" placeholder={strings.governmentPermit} />
                            <Link style={{ textAlign: "center", margin: "10px 0px" }} to={`/termsandconditions`} > {strings.termsAndConditions} </Link>
                            <label className="addPatientFormField">
                                <Field name="termsandconditions" type="checkbox" /> {strings.formTermsAndConditions}
                            </label>

                            <button type="submit">{strings.submitForm}</button>
                        </Form>
                    </Formik>
                </div>

            </div>


            <Footer />
        </div>
    )
}

export default AddPatient
