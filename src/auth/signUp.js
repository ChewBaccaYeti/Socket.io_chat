import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

let schemaAuth = Yup.object().shape({
	name: Yup.string().required('Required'),
	age: Yup.number()
		.required('Required')
		.positive('Must be a positive number')
		.integer('Must be an integer'),
	email: Yup.string().email('Invalid email format').required('Required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Required'),
	createdOn: Yup.date().default(function () {
		return new Date();
	}),
});

const SignUpForm = ({ onSubmit }) => {
	const registration = values => {
		const { name, email, password } = values;
		localStorage.setItem('user', JSON.stringify({ name, email, password }));
		console.log('User registered:', { name, email, password });
		onSubmit(); // Закрываем модалку после регистрации
	};

	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
			}}
			validationSchema={schemaAuth}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(true);
				setTimeout(() => {
					registration(values);
					setSubmitting(false);
				}, 400);
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<Typography variant='h6'>Sign Up</Typography>
					<div>
						<Field type='text' name='name' placeholder='Name' />
						<ErrorMessage name='name' component='div' />
					</div>
					<div>
						<Field type='email' name='email' placeholder='Email' />
						<ErrorMessage name='email' component='div' />
					</div>
					<div>
						<Field type='password' name='password' placeholder='Password' />
						<ErrorMessage name='password' component='div' />
					</div>
					<div>
						<Field
							type='password'
							name='confirmPassword'
							placeholder='Confirm Password'
						/>
						<ErrorMessage name='confirmPassword' component='div' />
					</div>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						fullWidth
						onClick={() => console.log('Register button clicked')}
					>
						Register
					</Button>
				</Form>
			)}
		</Formik>
	);
};

SignUpForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
