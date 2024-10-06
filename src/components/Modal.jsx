import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import SignUpForm from '../auth/signUp'; // форма для регистрации
import LogInForm from '../auth/logIn'; // форма для входа
import PropTypes from 'prop-types';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function AuthModal({ onSubmit }) {
	const [open, setOpen] = useState(true);
	const [authType, setAuthType] = useState(null); // 'signUp' или 'logIn'
	const [error, setError] = useState('');

	const AuthTypes = {
		SIGN_UP: 'signUp',
		LOG_IN: 'logIn',
	};

	const handleAuthError = errorMessage => {
		setError(errorMessage); // Устанавливаем сообщение об ошибке
	};

	const handleClose = () => setOpen(false);

	const handleAuthSuccess = () => {
		console.log('Authentication successful, closing modal...');
		setOpen(false); // Закрываем модалку
		onSubmit(); // Уведомляем родительский компонент об успешной аутентификации
	};

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					{!authType ? (
						<>
							<Typography variant='h6' component='h2'>
								Welcome! Please choose:
							</Typography>
							<Button
								variant='contained'
								color='primary'
								fullWidth
								onClick={() => setAuthType(AuthTypes.SIGN_UP)}
								autoFocus
								aria-label='Sign Up'
							>
								Sign Up
							</Button>
							<Button
								variant='outlined'
								color='secondary'
								fullWidth
								style={{ marginTop: '10px' }}
								onClick={() => setAuthType(AuthTypes.LOG_IN)}
								aria-label='Log In'
							>
								Log In
							</Button>
						</>
					) : (
						<>
							{error && <Typography color='error'>{error}</Typography>}
							{authType === AuthTypes.SIGN_UP ? (
								<SignUpForm
									onSubmit={handleAuthSuccess}
									onError={handleAuthError}
								/>
							) : (
								<LogInForm
									onSubmit={handleAuthSuccess}
									onError={handleAuthError}
								/>
							)}
						</>
					)}
				</Box>
			</Modal>
		</div>
	);
}

AuthModal.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
