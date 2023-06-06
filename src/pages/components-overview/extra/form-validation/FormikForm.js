import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { useState, useRef } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import cloudUploadFill from '@iconify/icons-eva/cloud-upload-fill';
// material
import axios from 'axios';
import {
  Stack,
  Button,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import DatePicker from '@material-ui/lab/DatePicker';
// utils
import { fData } from '../../../../utils/formatNumber';
import { fTimestamp } from '../../../../utils/formatTime';
import HelperFormik from '../../../../utils/helperFormik';
// components
import { QuillEditor, DraftEditor } from '../../../../components/editor';
//
import { FormSchema, defaultValues } from '.';

// ----------------------------------------------------------------------

FormikForm.propTypes = {
  openDevTool: PropTypes.bool
};

export default function FormikForm({ openDevTool }) {
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: FormSchema,
    onSubmit: async (values, { resetForm }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // alert(
      //   JSON.stringify(
      //     {
      //       ...values,
      //       photo: values.photo?.name,
      //       startDate: values.startDate && fTimestamp(values.startDate),
      //       endDate: values.endDate && fTimestamp(values.endDate),
      //       draftEditor: draftToHtml(convertToRaw(values.draftEditor.getCurrentContent()))
      //     },
      //     null,
      //     2
      //   )
      // );
      try {
        const res = await axios.post('http://localhost:3010/Staking', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NjYwMjY0IiwiaWF0IjoxNjg1NDI4NTc1LCJleHAiOjE2ODU0MzIxNzV9.h4lXAdDBe6EDy-LrFAMDvGx2ExvHPLUQVilr88xiS3I}`
          }
        });
      } catch (err) {
        console.log(err);
      }

      resetForm();
    }
  });

  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

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

      {openDevTool && <HelperFormik formik={formik} placement="left" />}
    </>
  );
}
