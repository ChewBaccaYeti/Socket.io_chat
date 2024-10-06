import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LogInForm = ({ onSubmit }) => {
	const handleLogin = values => {
		const storedUser = JSON.parse(localStorage.getItem('user'));
		if (
			storedUser &&
			storedUser.email === values.email &&
			storedUser.password === values.password
		) {
			console.log('Login successful');
			onSubmit();
		} else {
			console.log('Invalid credentials');
		}
	};

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					handleLogin(values);
					setSubmitting(false);
				}, 400);
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<Typography variant='h6'>Log In</Typography>
					<div>
						<Field type='email' name='email' placeholder='Email' />
						<ErrorMessage name='email' component='div' />
					</div>
					<div>
						<Field type='password' name='password' placeholder='Password' />
						<ErrorMessage name='password' component='div' />
					</div>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						fullWidth
					>
						Log In
					</Button>
				</Form>
			)}
		</Formik>
	);
};

LogInForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default LogInForm;
