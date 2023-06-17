// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets

// ============================|| FIREBASE - LOGIN ||============================ //

const ForgotPassword = ({ ...others }) => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const theme = useTheme();
  const scriptedRef = useScriptRef();
  // const customization = useSelector((state) => state.customization);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Forgot Password</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: 'info@aifx.com',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
            await forgotPassword(values);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            navigate('/');
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <div></div>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
                component={Link}
                to="/login"
              >
                Login
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Forgot Password
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;
