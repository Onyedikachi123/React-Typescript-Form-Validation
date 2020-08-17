import React from 'react';
import {Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button'

import FormikField from "./FormikField"
import FormikSelect, {FormikSelectItem} from "./FormikSelect"
import "./App.css"


interface FormValues {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    position: string;
}

const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    position: ''
};

// Array of the labels
const positionItems: FormikSelectItem[] = [
    {
        label: 'Front End',
        value: 'front_end'
    },
    {
        label: 'Back End',
        value: 'back_end'
    },
    {
        label: 'Dev Ops',
        value: 'dev_ops'
    },
    {
        label: 'QA',
        value: 'qa'
    },
]


// Here am trying to pretend that these email are on the db or is fetching from an api
// so it will check if the email a user input is taken and if it is, it shots an error and if not it passes.

const emailAddresses = [
  'test@gmail.com',
  'test2@gmail.com',
  'test3@gmail.com'
];

// lowercase Regex variable for readablity
const lowercaseRegex = /(?=.*[a-z])/;
// uppercase Regex variable for readability
const uppercaseRegex = /(?=.*[A-Z])/;
// numeric Regex variable for readability
const numericRegex = /(?=.*[0-9])/;


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .required('Required!'),
    email: Yup.string()
        .lowercase()
        .email('Must be a valid email!')
        .notOneOf(emailAddresses, 'Email already taken!')
        .required('Required!'),
    password: Yup.string()
        .matches(lowercaseRegex, 'One lowercase required!')
        .matches(uppercaseRegex, 'One uppercase required!')
        .matches(numericRegex, 'One number required!')
        .min(8, 'Minimum 8 characters required!')
        .required('Required!'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Password do not match') 
        .required('Required!'),
    position: Yup.string()
        .required('Required!')
});


const App: React.FC = () => {
    const handleSubmit = (values: FormValues): void => {
        // where post request api is called
      alert(JSON.stringify(values));
    };
    return (
        <div className="App">
            <h1>Sign Up</h1>
            <Formik 
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}>
         
            {({dirty, isValid}) => {
                return (
                    <Form>
                        <FormikField 
                        name="name" 
                        label="Name" 
                        required
                        />
                        <FormikField 
                        name="email" 
                        label="Email" 
                        required
                        />
                        <FormikField 
                        name="password" 
                        label="Password" 
                        required 
                        type="password"
                        />
                        <FormikField 
                        name="passwordConfirm" 
                        label="Confirm Password" 
                        required 
                        type="password"
                        />

                      {/* passing a props*/}
                        <FormikSelect name="position" items={positionItems} label="Position" required/>

                        <Button variant="contained" color="primary" disabled={!dirty || !isValid} type="submit">
                            SUBMIT
                        </Button>
                    </Form>
                )
            }}
            </Formik>
        </div>
    )
};

export default App;