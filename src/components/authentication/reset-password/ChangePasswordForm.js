import * as Yup from 'yup';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
// material
import { TextField, Alert, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import axios from 'axios';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

ChangePasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetPassword: PropTypes.func,
  onGetConfirmPassword: PropTypes.func
};

export default function ChangePasswordForm({ onSent, onGetPassword, onGetConfirmPassword }) {
  const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const getCharacterValidationError = (str) => `Your password must have at least 1 ${str} character`;

  const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password must have at least 8 characters')
      // different error messages for different requirements
      .matches(/[0-9]/, getCharacterValidationError('digit'))
      .matches(/[a-z]/, getCharacterValidationError('lowercase'))
      .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
    confirmPassword: Yup.string()
      .required('Please re-type your password')
      // use oneOf to match one of the values inside the array.
      // use "ref" to get the value of passwrod.
      .oneOf([Yup.ref('password')], 'Passwords does not match')
  });

  const UpdatePassword = async (password, token) => {
    try {
      const response = await axios.put('http://localhost:3010/api/auth/resetPassword', {
        token,
        password
      });
      if (response.status === 200) {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('otp');
        enqueueSnackbar('Password Changed', { variant: 'success' });
        navigate('/dashboard', { replace: true });
      } else {
        enqueueSnackbar(response.data, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword(values.email);
        if (isMountedRef.current) {
          onGetPassword(formik.values.password);
          onGetConfirmPassword(formik.values.confirmPassword);
          const userId = sessionStorage.getItem('email');
          const token = sessionStorage.getItem('otp');
          console.log(token);
          // setSubmitting(false);
          UpdatePassword(formik.values.password, token);
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

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('password')}
            type="password"
            label="New Password"
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            {...getFieldProps('confirmPassword')}
            type="password"
            label="Confirm New Password"
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Change Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
