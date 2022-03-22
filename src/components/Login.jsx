import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Auth from "../auth/auth";
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'

const LogIn = () => {
	const navigate = useNavigate();
	const [unAuthorized, setState] = useState(false)
	const validate = values => {
		const errors = {};
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
		return errors;
	};
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate,
		onSubmit: values => {
			Auth.LogIn(values).then((res)=>{
				console.log(res)
				if(res.data.message !== "invalid username or password"){
					localStorage.setItem('token',res.data.token)
					navigate('/');
				}else {
					setState(true);
					setTimeout(() => {
						setState(false)
					}, 3000);
				}
			})
		}
	});

	return (
		<>
			{unAuthorized?<Alert variant='danger'>
				invalid Username or Password
			</Alert>:''}
			<Form onSubmit={formik.handleSubmit} className="w-50 m-auto">
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
				<div className="d-grid gap-2">
				<Button variant="danger" type="submit"  size="lg">
				
					Log In
				</Button>
				</div>
			</Form>
		</>
	);
};

export default LogIn;