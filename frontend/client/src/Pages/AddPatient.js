import React, { useContext } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer";
import { Formik, Field, Form } from 'formik';



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
                            <Field className="addPatientFormField" name="dateofbirth" type="date" placeholder={strings.formDateOfBirth} />
                            <Field className="addPatientFormField" name="resName" type="text" placeholder={strings.formResponsibleName} />
                            <Field className="addPatientFormField" name="resPhone" type="text" placeholder={strings.formResponsiblePhone} />
                            <Field className="addPatientFormField" name="resEmail" type="email" placeholder={strings.formResponsibleEmail} />
                            <Field className="addPatientFormField" name="amount" type="number" placeholder={strings.collectedAmount} />
                            <Field className="addPatientFormField" name="iban" type="text" placeholder={strings.IBANNumber} />
                            <span style={{ textAlign: "center", margin: "10px 0px" }}>-{strings.governmentPermit}-</span>
                            <Field className="addPatientFormField" name="permit" type="file" placeholder={strings.governmentPermit} />
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
