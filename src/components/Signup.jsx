// import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddNewUser = () => {
	const navigate = useNavigate();
	const validate = values => {
		const errors = {};
		if (!values.name) {
			errors.name = 'Required';
		} else if (values.name.length < 3) {
			errors.name = 'Must be 3 characters or more';
		}

		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		}

		if (!values.password) {
			errors.password = 'Required';
		} else if (values.password.length < 8) {
			errors.password = 'Must be 8 characters or more';
		}

		if (!values.passwordConfirmation) {
			errors.passwordConfirmation = 'Required';
		} else if (values.passwordConfirmation !== values.password) {
			errors.passwordConfirmation = "passwords don't match";
		}

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		},
		validate,
		onSubmit: values => {
			axios.post('http://localhost:3000/api/v1/users/signUp', values)
				.then((res) => {
					console.log(res)
					navigate('/log-in');
				})
		}
	});
	return (
		<Form onSubmit={formik.handleSubmit} className="w-50 m-auto">
			<Form.Group className="mb-3" controlId="formBasicText">
				<Form.Label>Name</Form.Label>
				<Form.Control className={formik.touched.name && formik.errors.name ?"is-invalid":''} required type="text" name="name" placeholder="Name" onChange={formik.handleChange} onBlur={formik.handleBlur}
					value={formik.values.name} autoComplete="on" />
				{formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control className={formik.touched.email && formik.errors.email ?"is-invalid":''} type="email" name="email" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur}
					value={formik.values.email} autoComplete="on" />
				{formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control className={formik.touched.password && formik.errors.password ?"is-invalid":''} type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}
					value={formik.values.password} placeholder="Password" autoComplete="on" />
				{formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
				<Form.Label>Password Confirmation</Form.Label>
				<Form.Control className={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ?"is-invalid":''} type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={formik.handleChange} onBlur={formik.handleBlur}
					value={formik.values.passwordConfirmation} autoComplete="on" />
				{formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? <div className="text-danger">{formik.errors.passwordConfirmation}</div> : null}
			</Form.Group>
			<div className="d-grid gap-2">
			<Button variant="danger" size="lg" type="submit">
				Sign Up
			</Button>
			</div>
		</Form>
	);
};

export default AddNewUser;