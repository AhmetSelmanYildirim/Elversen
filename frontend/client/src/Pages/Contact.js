import React, { useContext } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer"
import { Formik, Field, Form } from 'formik';




const Contact = () => {
    const { } = useContext(AppContext)
    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                {strings.contact}

                <div className='addPatientFormArea'>

                    <Formik
                        initialValues={{ name: "", surname: "", phone:"", email:"", subject:"", message:"" }}
                        onSubmit={async (values) => {
                            alert(JSON.stringify(values));
                        }}
                    >
                        <Form className='contactForm'>
                            <Field className="contactFormField" name="name" type="text" placeholder={strings.formName} />
                            <Field className="contactFormField" name="surname" type="text" placeholder={strings.formSurname} />
                            <Field className="contactFormField" name="phone" type="text" placeholder={strings.formPhone} />
                            <Field className="contactFormField" name="email" type="email" placeholder={strings.formEmail} />
                            <Field className="contactFormField" name="subject" type="text" placeholder={strings.formSubject} />
                            <Field className="contactFormField" name="message" type="text" placeholder={strings.formMessage} />
                            <button type="submit">{strings.submitForm}</button>
                        </Form>
                    </Formik>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Contact
