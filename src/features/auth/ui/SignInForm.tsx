import { FC, useEffect, useRef } from 'react';
import {
	Avatar,
	Box,
	Container,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../../shared/store/api/authApi';
import { userActions } from '../../../shared/store/slices/user';
import { getMessageFromError } from '../../../shared/utils';
import { useAppDispatch, useAppSelector } from '../../../shared/store/utils';
import { productsSelectors } from '../../../shared/store/slices/products';
import { AuthFormValues } from '../model/types';
import { signInFormSchema } from '../model/validation';
import { prefetchProductsAfterAuth } from '../model/prefetchAfterAuth';

export const SignInForm: FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [signInRequestFn] = useSignInMutation();
	const emailInputRef = useRef<HTMLInputElement | null>(null);
	const submitAttemptsRef = useRef(0);
	const productsState = useAppSelector(productsSelectors.getProductsState);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<AuthFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInFormSchema),
	});

	useEffect(() => {
		emailInputRef.current?.focus();
	}, []);

	const submitHandler: SubmitHandler<AuthFormValues> = async (values) => {
		submitAttemptsRef.current += 1;

		try {
			const response = await signInRequestFn(values).unwrap();

			dispatch(userActions.setUser(response.user));
			dispatch(
				userActions.setAccessToken({ accessToken: response.accessToken })
			);
			submitAttemptsRef.current = 0;
			prefetchProductsAfterAuth(dispatch, productsState);

			toast.success('Вы успешно авторизованы!');

			if (location.state?.from) {
				return navigate(location.state.from, { replace: true });
			}

			navigate('/', { replace: true });
		} catch (error) {
			const fallbackMessage =
				submitAttemptsRef.current > 1
					? `Не известная ошибка при авторизации пользователя. Попытка ${submitAttemptsRef.current}.`
					: 'Не известная ошибка при авторизации пользователя';

			toast.error(getMessageFromError(error, fallbackMessage));
		}
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign In
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{ my: 1 }}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => {
							const { ref, ...fieldProps } = field;

							return (
								<TextField
									margin='normal'
									label='Email Address'
									type='email'
									fullWidth
									required
									autoComplete='email'
									error={!!errors.email?.message}
									helperText={errors.email?.message}
									inputRef={(element) => {
										ref(element);
										emailInputRef.current = element;
									}}
									{...fieldProps}
								/>
							);
						}}
					/>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								label='Password'
								type='password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								margin='normal'
								fullWidth
								required
								{...field}
							/>
						)}
					/>

					<LoadingButton
						type='submit'
						disabled={isSubmitted && (!isValid || isSubmitting)}
						loading={isSubmitting}
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						Sign IN
					</LoadingButton>
					<Box display='flex' justifyContent='center' flexGrow={1}>
						<Link component={RouterLink} to='/signup'>
							SIGN UP
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
