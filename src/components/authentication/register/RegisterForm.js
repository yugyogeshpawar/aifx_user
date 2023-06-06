import * as Yup from 'yup';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router';
// material
import { Stack, TextField, IconButton, InputAdornment, Alert } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sponsorDetails, setSponsorDetails] = useState({});
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const sponsorId = queryParameters.get('sponcer_id');
  console.log(sponsorId);

  const getCharacterValidationError = (str) => `Your password must have at least 1 ${str} character`;
  const RegisterSchema = Yup.object().shape({
    memberName: Yup.string().required('Member Name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .required('Please enter a password')
      .min(8, 'Password must have at least 8 characters')
      .matches(/[0-9]/, getCharacterValidationError('digit'))
      .matches(/[a-z]/, getCharacterValidationError('lowercase'))
      .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
    confirmPassword: Yup.string()
      .required('Please re-type your password')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
    contactNo: Yup.number().required('Contact No is required')
  });

  const getSponsor = async () => {
    try {
      const res = await axios.get('http://localhost:3010/api/Auth/register', {
        params: {
          sponcer_id: sponsorId
        }
      });
      if (res.status === 200) {
        setSponsorDetails(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (sponsorId !== null && sponsorId !== undefined && sponsorId.length >= 6) {
      getSponsor();
    } else {
      enqueueSnackbar('Sponcer ID is required', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });

      navigate('/auth/login');
    }
  }, []);

  const registerUser = async (payload) => {
    try {
      const res = await axios.post('http://localhost:3010/api/Auth/register', payload, {
        params: {
          sponcer_id: sponsorId
        }
      });
      if (res.status === 200) {
        if (res.data.status === false) {
          enqueueSnackbar('Already Registered', {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        } else {
          enqueueSnackbar('Register success', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
          navigate('/auth/login');
        }
      } else {
        enqueueSnackbar('Please Try Again', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      memberName: '',
      contactNo: '',
      email: '',
      password: '',
      confirmPassword: '',
      sponsorId: sponsorDetails.sponcer_id
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const payload = {
          member_name: values.memberName,
          contactNo: values.contactNo,
          password: values.password,
          cpassword: values.confirmPassword,
          email: values.email
        };
        registerUser(payload);
        // await register(values.email, values.password, values.firstName, values.memberName);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          {sponsorDetails.sponcer_id && (
            <TextField fullWidth label="Sponsor Id" disabled defaultValue={sponsorDetails.sponcer_id} />
          )}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {sponsorDetails.sponcer_name && (
              <TextField fullWidth label="Sponsor Name" disabled defaultValue={sponsorDetails.sponcer_name} />
            )}

            <TextField
              fullWidth
              label="Member Name"
              {...getFieldProps('memberName')}
              error={Boolean(touched.memberName && errors.memberName)}
              helperText={touched.memberName && errors.memberName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="contactNo"
            type="number"
            label="Contact No"
            {...getFieldProps('contactNo')}
            error={Boolean(touched.contactNo && errors.contactNo)}
            helperText={touched.contactNo && errors.contactNo}
          />
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
