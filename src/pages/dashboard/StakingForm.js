import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
// material
import { TextField, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import axios from 'axios';
// ----------------------------------------------------------------------
const FormSchema = Yup.object().shape({
  wallet: Yup.string().required('Wallet Address is required'),
  staking: Yup.number().required('Staking is required').positive('Staking must be a positive number').integer(),
  transactionHash: Yup.string().required('Transaction Hash is required')
});
const defaultValues = {
  staking: '',
  wallet: '',
  transactionHash: ''
};
export default function StakingForm() {
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: FormSchema,
    onSubmit: async (values, { resetForm }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        console.log('hello');
        const payload = {
          wallerAddress: values.wallet,
          amount: values.staking,
          transactionHash: values.transactionHash
        };
        const res = await axios.post('http://localhost:3010/api/Staking', payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
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
            <TextField
              fullWidth
              type="text"
              label="Wallet"
              {...getFieldProps('wallet')}
              error={Boolean(touched.wallet && errors.wallet)}
              helperText={touched.wallet && errors.wallet}
            />

            <TextField
              fullWidth
              label="Staking(USD)"
              {...getFieldProps('staking')}
              error={Boolean(touched.staking && errors.staking)}
              helperText={touched.staking && errors.staking}
            />
            <TextField
              fullWidth
              label="Transaction Hash"
              {...getFieldProps('transactionHash')}
              error={Boolean(touched.transactionHash && errors.transactionHash)}
              helperText={touched.transactionHash && errors.transactionHash}
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
