import React, { useContext } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer"
import { Formik, Field, Form } from 'formik';
import axios from "axios"
import * as Yup from "yup"




const Contact = () => {
    const { } = useContext(AppContext)
    
    const contactValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),

        surname: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),

        phone: Yup.string()
            .min(10, strings.tooShort)
            .max(20, strings.tooLong)
            .required(strings.required),

        email: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),

        subject: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),

        message: Yup.string()
            .min(2, strings.tooShort)
            .max(50, strings.tooLong)
            .required(strings.required),
    });

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                {strings.contact}

                <div className='addPatientFormArea'>

                    <Formik
                        initialValues={{ name: "", surname: "", phone: "", email: "", subject: "", message: "" }}
                        validationSchema={contactValidationSchema}
                        onSubmit={async (values) => {
                            axios.post(`${process.env.REACT_APP_SERVER_URL}/contact`, JSON.stringify(values))
                                .then(response => console.log(response))
                                .catch(err => console.log(err.message))

                            values.name = "";
                            values.surname = "";
                            values.phone = "";
                            values.email = "";
                            values.subject = "";
                            values.message = "";

                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className='contactForm'>

                                <Field className="contactFormField" name="name" type="text" placeholder={strings.formName} />
                                {errors.name && touched.name ? (
                                    <div>{errors.name}</div>
                                ) : null}
                                <Field className="contactFormField" name="surname" type="text" placeholder={strings.formSurname} />
                                {errors.surname && touched.surname ? (
                                    <div>{errors.surname}</div>
                                ) : null}
                                <Field className="contactFormField" name="phone" type="text" placeholder={strings.formPhone} />
                                {errors.phone && touched.phone ? (
                                    <div>{errors.phone}</div>
                                ) : null}
                                <Field className="contactFormField" name="email" type="email" placeholder={strings.formEmail} />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                                <Field className="contactFormField" name="subject" type="text" placeholder={strings.formSubject} />
                                {errors.subject && touched.subject ? (
                                    <div>{errors.subject}</div>
                                ) : null}
                                <Field className="contactFormField" name="message" type="text" placeholder={strings.formMessage} />
                                {errors.message && touched.message ? (
                                    <div>{errors.message}</div>
                                ) : null}



                                {/* <Field className="contactFormField" name="name" type="text" placeholder={strings.formName} />
                                <Field className="contactFormField" name="surname" type="text" placeholder={strings.formSurname} />
                                <Field className="contactFormField" name="phone" type="text" placeholder={strings.formPhone} />
                                <Field className="contactFormField" name="email" type="email" placeholder={strings.formEmail} />
                                <Field className="contactFormField" name="subject" type="text" placeholder={strings.formSubject} />
                                <Field className="contactFormField" name="message" type="text" placeholder={strings.formMessage} /> */}
                                <button type="submit">{strings.submitForm}</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>


            <Footer />
        </div >
    )
}

export default Contact
