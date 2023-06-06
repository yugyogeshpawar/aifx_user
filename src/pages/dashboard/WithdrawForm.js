import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import { TextField, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import axios from 'axios';
import { useEffect, useState } from 'react';
// ----------------------------------------------------------------------
const FormSchema = Yup.object().shape({
  staking: Yup.number().required('Staking is required')
});
const defaultValues = {
  wallet: ''
};

export default function WithdrawForm() {
  const [walletBalance, setWalletBalance] = useState('');

  useEffect(() => {
    const getStaking = async () => {
      try {
        const res = await axios.get('http://localhost:3010/api/Dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(res);
        setWalletBalance(res.data.data.wallet_amount);
      } catch (err) {
        console.log(err);
      }
    };
    getStaking();
  }, []);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: FormSchema,
    onSubmit: async (values, { resetForm }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        const payload = {
          amount: values.staking
        };
        const res = await axios.post('http://localhost:3010/api/Withdraw/Request', payload, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NjYwMjY0IiwiaWF0IjoxNjg1NDM4NDc2LCJleHAiOjE2ODU0NDIwNzZ9.KVyV9IPhciJ6_L0CR7m4_u08ShG6w2r470Y8xuiAnwE`
          }
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }

      resetForm();
    }
  });

  const { dirty, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {console.log(walletBalance)}
            <TextField
              fullWidth
              type="text"
              label="Wallet Balance"
              placeholder={walletBalance}
              error={Boolean(touched.wallet && errors.wallet)}
              helperText={touched.wallet && errors.wallet}
              disabled
              value={walletBalance}
            />

            <TextField
              fullWidth
              type="number"
              label="Staking(USD)"
              {...getFieldProps('staking')}
              error={Boolean(touched.staking && errors.staking)}
              helperText={touched.staking && errors.staking}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={!dirty}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}
